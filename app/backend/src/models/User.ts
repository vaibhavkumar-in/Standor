import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    email: string
    name: string
    emailVerified: boolean
    password?: string
    avatar?: string
    role: 'USER' | 'ADMIN'
    socialProviders?: {
        provider: 'google' | 'github'
        subjectId: string
        linkedAt: Date
    }[]
    mfaEnabled: boolean
    mfaSecret?: string
    backupCodes: string[]
    refreshTokens: {
        tokenHash: string
        expiresAt: Date
        deviceId: string
        replacedByToken?: string
        revokedAt?: Date
    }[]
    verifyEmailToken?: string
    verifyEmailTokenExpiry?: Date
    resetPasswordToken?: string
    resetPasswordTokenExpiry?: Date
    failedLoginAttempts: number
    lockoutUntil?: Date
    createdAt: Date
    lastLoginAt: Date
    lastLoginDevice?: string
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    emailVerified: { type: Boolean, default: false },
    password: { type: String },
    avatar: { type: String },
    role: { type: String, enum: ['USER', 'ADMIN'], default: 'USER' },
    socialProviders: [{
        provider: { type: String, enum: ['google', 'github'] },
        subjectId: { type: String },
        linkedAt: { type: Date, default: Date.now }
    }],
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String },
    backupCodes: [{ type: String }],
    refreshTokens: [{
        tokenHash: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        deviceId: { type: String, required: true },
        replacedByToken: { type: String },
        revokedAt: { type: Date }
    }],
    verifyEmailToken: { type: String },
    verifyEmailTokenExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordTokenExpiry: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date },
    lastLoginAt: { type: Date, default: Date.now },
    lastLoginDevice: { type: String }
}, {
    timestamps: true
})

UserSchema.index({ verifyEmailToken: 1 }, { sparse: true })
UserSchema.index({ resetPasswordToken: 1 }, { sparse: true })

export default mongoose.model<IUser>('User', UserSchema)
