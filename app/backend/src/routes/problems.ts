import { Router } from 'express'
import { z } from 'zod'
import axios from 'axios'
import Problem from '../models/Problem.js'
import { requireAuth } from '../middleware/auth.js'
import { env } from '../config/env.js'

export const problemsRouter = Router()
problemsRouter.use(requireAuth)

// GET /api/problems?q=&difficulty=&category=&tag=
problemsRouter.get('/', async (req, res) => {
    const { q, difficulty, category, tag } = req.query as Record<string, string | undefined>

    try {
        const query: any = {}

        if (q) {
            query.$or = [
                { title: { $regex: q, $options: 'i' } },
                { description: { $regex: q, $options: 'i' } },
                { tags: { $regex: q, $options: 'i' } }
            ]
        }

        if (difficulty) {
            query.difficulty = difficulty.toUpperCase()
        }

        if (category) {
            query.category = { $regex: `^${category}$`, $options: 'i' }
        }

        if (tag) {
            query.tags = { $regex: `^${tag}$`, $options: 'i' }
        }

        const results = await Problem.find(query)

        res.json(
            results.map((p) => ({
                id: p._id,
                title: p.title,
                difficulty: p.difficulty,
                category: p.category,
                tags: p.tags,
                description: p.description,
                examples: p.examples,
                testCaseCount: p.testCases.length,
            }))
        )
    } catch {
        res.status(500).json({ error: 'Failed to fetch problems' })
    }
})

// GET /api/problems/categories
problemsRouter.get('/categories', async (_req, res) => {
    try {
        const cats = await Problem.distinct('category')
        res.json(cats.sort())
    } catch {
        res.status(500).json({ error: 'Failed to fetch categories' })
    }
})

// GET /api/problems/tags
problemsRouter.get('/tags', async (_req, res) => {
    try {
        const tags = await Problem.distinct('tags')
        res.json(tags.sort())
    } catch {
        res.status(500).json({ error: 'Failed to fetch tags' })
    }
})

// GET /api/problems/:slug
problemsRouter.get('/:slug', async (req, res) => {
    const slug = decodeURIComponent(req.params.slug ?? '')
    try {
        const problem = await Problem.findOne({ title: { $regex: `^${slug}$`, $options: 'i' } })

        if (!problem) {
            res.status(404).json({ error: 'Problem not found' })
            return
        }

        res.json({
            id: problem._id,
            title: problem.title,
            difficulty: problem.difficulty,
            category: problem.category,
            tags: problem.tags,
            description: problem.description,
            examples: problem.examples,
            starterCode: problem.starterCode.reduce((acc: any, curr) => {
                acc[curr.language] = curr.code
                return acc
            }, {}),
            testCases: problem.testCases.filter((tc) => !tc.hidden),
        })
    } catch {
        res.status(500).json({ error: 'Failed to fetch problem' })
    }
})

// POST /api/problems/:slug/run — run code via Piston
problemsRouter.post('/:slug/run', async (req, res) => {
    const schema = z.object({
        language: z.string().min(1).max(50),
        code: z.string().min(1).max(50_000),
    })

    const parsed = schema.safeParse(req.body)
    if (!parsed.success) {
        res.status(400).json({ error: 'Invalid request' })
        return
    }

    const slug = decodeURIComponent(req.params.slug ?? '')
    const problem = await Problem.findOne({ title: { $regex: `^${slug}$`, $options: 'i' } })

    if (!problem) {
        res.status(404).json({ error: 'Problem not found' })
        return
    }

    const { language, code } = parsed.data

    const results = await Promise.all(
        problem.testCases.map(async (tc, i) => {
            try {
                const { data } = await axios.post(
                    `${env.PISTON_API_URL}/execute`,
                    {
                        language,
                        version: '*',
                        files: [{ content: code }],
                        stdin: tc.input,
                        run_timeout: 2000,
                    },
                    { timeout: 15_000 },
                )

                const actual = (String((data as any).run?.stdout ?? '')).trim()
                const expected = tc.expected.trim()
                const passed = actual === expected

                return {
                    index: i + 1,
                    passed,
                    hidden: tc.hidden,
                    input: tc.hidden ? null : tc.input,
                    expected: tc.hidden ? null : tc.expected,
                    actual: tc.hidden ? (passed ? 'Passed' : 'Failed') : actual,
                    stderr: tc.hidden ? null : ((data as any).run?.stderr ?? ''),
                }
            } catch {
                return { index: i + 1, passed: false, hidden: tc.hidden, input: null, expected: null, actual: 'Execution error', stderr: null }
            }
        }),
    )

    const total = results.length
    const passed = results.filter((r) => r.passed).length

    res.json({ passed, total, results })
})
