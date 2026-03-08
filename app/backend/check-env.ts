import 'dotenv/config'
import { envSchema } from './src/config/env.js'
import fs from 'fs'

try {
    envSchema.parse(process.env)
    fs.writeFileSync('error-log.txt', 'OK')
} catch (e) {
    fs.writeFileSync('error-log.txt', JSON.stringify(e, null, 2))
}
