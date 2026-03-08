import { Router } from 'express'
import { z } from 'zod'
import passport from 'passport'
import crypto from 'crypto'
import User from '../models/User.js'
import { env } from '../config/env.js'
import { HashService } from '../utils/hash.js'
import { TokenService } from '../services/tokenService.js'
import { EmailService } from '../services/emailService.js'
import { requireAuth, type AuthRequest } from '../middleware/auth.js'

export const authRouter = Router()

// Helper to set refresh token cookie
const setTokenCookie = (res: any, token: string) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    })
}

// Helper to hash verification/reset tokens
const hashTokenSHA256 = (token: string): string =>
    crypto.createHash('sha256').update(token).digest('hex')

/**
 * POST /api/auth/register
 * 1. Validate input
 * 2. Check for existing account
 * 3. Hash password with Argon2id
 * 4. Create user with hashed verification token
 * 5. Send verification email
 */
authRouter.post('/register', async (req, res) => {
    const schema = z.object({
        name: z.string().min(2).max(80),
        email: z.string().email(),
        password: z.string().min(12, 'Password must be at least 12 characters'),
    })

    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: parsed.error.flatten() })
        return
    }

    const { name, email, password } = parsed.data

    try {
        const exists = await User.findOne({ email })
        if (exists) {
            res.status(409).json({ error: 'Email already registered' })
            return
        }

        const passwordHash = await HashService.hash(password)

        // Generate a raw token → hash it for DB storage, send raw to user email
        const rawToken = crypto.randomBytes(32).toString('hex')
        const hashedToken = hashTokenSHA256(rawToken)

        const user = await User.create({
            name,
            email,
            password: passwordHash,
            emailVerified: env.NODE_ENV !== 'production', // auto-verify in dev
            verifyEmailToken: hashedToken,
            verifyEmailTokenExpiry: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        })

        // Send verification email with the raw token
        await EmailService.sendVerificationEmail(email, rawToken)

        res.status(202).json({
            message: 'Account created. Please check your email to verify.',
            user: { id: user._id, email: user.email, name: user.name }
        })
    } catch (e) {
        console.error('[auth/register]', e)
        res.status(500).json({ error: 'Registration failed' })
    }
})

/**
 * POST /api/auth/login
 * 1. Validate credentials  
 * 2. Check account lockouts
 * 3. Verify Argon2id hash
 * 4. Check if email is verified
 * 5. Issue Access Token + Rotate Refresh Token
 */
authRouter.post('/login', async (req, res) => {
    const schema = z.object({
        email: z.string().email(),
        password: z.string(),
        deviceId: z.string().default('unknown-web-client')
    })

    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: 'Invalid credentials' })
        return
    }

    const { email, password, deviceId } = parsed.data

    try {
        const user = await User.findOne({ email })
        if (!user || !user.password) {
            res.status(401).json({ error: 'Incorrect email or password' })
            return
        }

        // Check lockout
        if (user.lockoutUntil && user.lockoutUntil > new Date()) {
            const remainingSec = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / 1000)
            res.status(429).json({ error: `Account locked. Try again in ${remainingSec}s` })
            return
        }

        const isMatch = await HashService.verify(user.password, password)
        if (!isMatch) {
            // Increment failed attempts → lockout after 5
            user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1
            if (user.failedLoginAttempts >= 5) {
                user.lockoutUntil = new Date(Date.now() + 15 * 60 * 1000) // 15 min lockout
                user.failedLoginAttempts = 0
            }
            await user.save()
            res.status(401).json({ error: 'Incorrect email or password' })
            return
        }

        if (!user.emailVerified && env.NODE_ENV === 'production') {
            res.status(403).json({ error: 'Please verify your email before logging in' })
            return
        }

        // Reset failed attempts on success
        user.failedLoginAttempts = 0
        user.lockoutUntil = undefined

        // Issue Access Token
        const accessToken = TokenService.generateAccessToken({
            userId: user._id.toString(),
            role: user.role
        })

        // Issue Refresh Token
        const refreshToken = TokenService.generateRefreshToken()
        const tokenHash = TokenService.hashToken(refreshToken)

        user.refreshTokens.push({
            tokenHash,
            deviceId,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        })

        user.lastLoginAt = new Date()
        user.lastLoginDevice = deviceId
        await user.save()

        setTokenCookie(res, refreshToken)
        res.json({
            accessToken,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
                emailVerified: user.emailVerified,
                mfaEnabled: user.mfaEnabled,
            }
        })
    } catch (e) {
        console.error('[auth/login]', e)
        res.status(500).json({ error: 'An unexpected error occurred' })
    }
})

/**
 * POST /api/auth/refresh
 */
authRouter.post('/refresh', async (req, res) => {
    const token = req.cookies.refreshToken
    if (!token) return res.status(401).json({ error: 'No refresh token' })

    try {
        const tokenHash = TokenService.hashToken(token)
        const user = await User.findOne({ 'refreshTokens.tokenHash': tokenHash })

        if (!user) return res.status(401).json({ error: 'Invalid refresh token' })

        const deviceId = req.body.deviceId || 'reused-session'
        const newRefreshToken = await TokenService.rotateRefreshToken(user._id.toString(), token, deviceId)

        const accessToken = TokenService.generateAccessToken({
            userId: user._id.toString(),
            role: user.role
        })

        setTokenCookie(res, newRefreshToken)
        res.json({ accessToken })
    } catch (e: any) {
        res.status(401).json({ error: e.message })
    }
})

/**
 * GET /api/auth/verify-email?token=<rawToken>
 * Look up user by hashed token, check expiry, mark verified.
 */
authRouter.get('/verify-email', async (req, res) => {
    const rawToken = req.query.token as string
    if (!rawToken) return res.status(400).json({ error: 'Token is required' })

    try {
        const hashedToken = hashTokenSHA256(rawToken)

        const user = await User.findOne({
            verifyEmailToken: hashedToken,
            verifyEmailTokenExpiry: { $gt: new Date() },
        })

        if (!user) {
            res.status(400).json({ error: 'Invalid or expired verification token' })
            return
        }

        user.emailVerified = true
        user.verifyEmailToken = undefined
        user.verifyEmailTokenExpiry = undefined
        await user.save()

        res.json({ message: 'Email verified successfully. You can now log in.' })
    } catch (e) {
        console.error('[auth/verify-email]', e)
        res.status(500).json({ error: 'Verification failed' })
    }
})

/**
 * POST /api/auth/resend-verification
 */
authRouter.post('/resend-verification', async (req, res) => {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })

    try {
        const user = await User.findOne({ email, emailVerified: false })
        if (user) {
            const rawToken = crypto.randomBytes(32).toString('hex')
            user.verifyEmailToken = hashTokenSHA256(rawToken)
            user.verifyEmailTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000)
            await user.save()
            await EmailService.sendVerificationEmail(email, rawToken)
        }
        // Always return success to prevent account discovery
        res.json({ message: 'If an unverified account exists, a new verification email has been sent.' })
    } catch (e) {
        res.status(500).json({ error: 'Failed to process request' })
    }
})

/**
 * POST /api/auth/forgot-password
 */
authRouter.post('/forgot-password', async (req, res) => {
    const { email } = req.body
    if (!email) return res.status(400).json({ error: 'Email is required' })

    try {
        const user = await User.findOne({ email })
        if (user) {
            const rawToken = crypto.randomBytes(32).toString('hex')
            user.resetPasswordToken = hashTokenSHA256(rawToken)
            user.resetPasswordTokenExpiry = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
            await user.save()
            await EmailService.sendPasswordResetEmail(email, rawToken)
        }
        // Always return success to prevent account discovery
        res.json({ message: 'If an account exists, a reset link has been sent.' })
    } catch (e) {
        res.status(500).json({ error: 'Failed to process request' })
    }
})

/**
 * POST /api/auth/reset-password
 */
authRouter.post('/reset-password', async (req, res) => {
    const schema = z.object({
        token: z.string().min(1),
        password: z.string().min(12, 'Password must be at least 12 characters'),
    })

    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: parsed.error.flatten() })
        return
    }

    try {
        const hashedToken = hashTokenSHA256(parsed.data.token)
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordTokenExpiry: { $gt: new Date() },
        })

        if (!user) {
            res.status(400).json({ error: 'Invalid or expired reset token' })
            return
        }

        user.password = await HashService.hash(parsed.data.password)
        user.resetPasswordToken = undefined
        user.resetPasswordTokenExpiry = undefined
        // Revoke all refresh tokens on password change
        user.refreshTokens = []
        await user.save()

        res.json({ message: 'Password reset successful. Please log in with your new password.' })
    } catch (e) {
        console.error('[auth/reset-password]', e)
        res.status(500).json({ error: 'Reset failed' })
    }
})

/**
 * POST /api/auth/logout
 */
authRouter.post('/logout', requireAuth, async (req: AuthRequest, res) => {
    const token = req.cookies.refreshToken
    if (token) {
        const tokenHash = TokenService.hashToken(token)
        await User.updateOne(
            { _id: req.userId },
            { $pull: { refreshTokens: { tokenHash } } }
        )
    }

    res.clearCookie('refreshToken')
    res.json({ message: 'Logged out successfully' })
})

/**
 * POST /api/auth/logout-all — Revoke all sessions
 */
authRouter.post('/logout-all', requireAuth, async (req: AuthRequest, res) => {
    await User.updateOne({ _id: req.userId }, { $set: { refreshTokens: [] } })
    res.clearCookie('refreshToken')
    res.json({ message: 'All sessions revoked' })
})

/**
 * GET /api/auth/me — Get current user info
 */
authRouter.get('/me', requireAuth, async (req: AuthRequest, res) => {
    try {
        const user = await User.findById(req.userId).select('-password -refreshTokens -mfaSecret -backupCodes -verifyEmailToken -resetPasswordToken')
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ user })
    } catch {
        res.status(500).json({ error: 'Failed to fetch user' })
    }
})

/**
 * GET /api/auth/sessions — List active sessions/devices
 */
authRouter.get('/sessions', requireAuth, async (req: AuthRequest, res) => {
    try {
        const user = await User.findById(req.userId).select('refreshTokens')
        if (!user) return res.status(404).json({ error: 'User not found' })
        const sessions = user.refreshTokens
            .filter(rt => !rt.revokedAt && rt.expiresAt > new Date())
            .map(rt => ({ deviceId: rt.deviceId, expiresAt: rt.expiresAt }))
        res.json({ sessions })
    } catch {
        res.status(500).json({ error: 'Failed to fetch sessions' })
    }
})

/**
 * GET /api/auth/google
 */
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

/**
 * GET /api/auth/google/callback
 */
authRouter.get('/google/callback', passport.authenticate('google', { session: false }), async (req: any, res) => {
    const user = req.user
    const deviceId = 'google-oauth'

    const accessToken = TokenService.generateAccessToken({ userId: user._id.toString(), role: user.role })
    const refreshToken = TokenService.generateRefreshToken()

    user.refreshTokens.push({
        tokenHash: TokenService.hashToken(refreshToken),
        deviceId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    })
    await user.save()

    setTokenCookie(res, refreshToken)

    // Redirect to frontend with access token in URL for initial load
    res.redirect(`${env.CLIENT_URL}/auth/callback?token=${accessToken}`)
})
