import axios from 'axios'
import { env } from '../config/env.js'

export const executionService = {
    async execute(language: string, source: string, stdin: string = '') {
        const PISTON_URL = env.PISTON_URL || 'http://localhost:2000'

        // Map common language identifiers to Piston runtimes
        const langMap: Record<string, string> = {
            'cpp': 'cpp',
            'javascript': 'javascript',
            'typescript': 'typescript',
            'python': 'python',
            'java': 'java',
            'go': 'go',
            'rust': 'rust'
        }

        const targetLang = langMap[language] || language

        try {
            const { data } = await axios.post(
                `${PISTON_URL}/execute`,
                {
                    language: targetLang,
                    version: '*',
                    files: [{ content: source }],
                    stdin,
                    run_timeout: 3000,
                    compile_timeout: 10_000,
                },
                { timeout: 15_000 }
            )
            return data
        } catch (err: any) {
            console.error('[ExecutionService] Piston error:', err.response?.data || err.message)
            throw new Error('Code execution engine is temporarily unavailable')
        }
    }
}
