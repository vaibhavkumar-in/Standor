import 'dotenv/config'
import mongoose from 'mongoose'
import Problem from '../src/models/Problem.js'
import { DEMO_PROBLEMS } from '../src/data/problems.js'

async function seed() {
    const MONGO_URI = process.env.MONGO_URI
    if (!MONGO_URI) {
        console.error('MONGO_URI is not defined')
        process.exit(1)
    }

    try {
        await mongoose.connect(MONGO_URI)
        console.log('Connected to MongoDB for seeding...')

        for (const p of DEMO_PROBLEMS) {
            const existing = await Problem.findOne({ title: p.title })
            if (existing) {
                console.log(`Problem "${p.title}" already exists, skipping.`)
                continue
            }

            // Map DEMO_PROBLEMS format to Problem model format
            const starterCodeArray = Object.entries(p.starterCode).map(([language, code]) => ({
                language,
                code
            }))

            await Problem.create({
                title: p.title,
                description: p.description,
                difficulty: p.difficulty,
                category: p.category,
                tags: p.tags,
                examples: p.examples.map(ex => ({ input: ex.input, output: ex.output })),
                testCases: p.testCases,
                starterCode: starterCodeArray,
                isCustom: false
            })
            console.log(`Problem "${p.title}" seeded.`)
        }

        console.log('Seeding completed successfully.')
    } catch (err) {
        console.error('Error seeding database:', err)
    } finally {
        await mongoose.disconnect()
        process.exit(0)
    }
}

seed()
