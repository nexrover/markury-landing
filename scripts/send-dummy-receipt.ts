import { readFileSync } from 'fs'
import { join } from 'path'
import { sendDummyPlayReceipt } from '../app/api/_lib/resend-receipt'

function loadEnv(file: string) {
  const raw = readFileSync(file, 'utf8')
  for (const line of raw.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eq = trimmed.indexOf('=')
    if (eq < 0) continue
    const key = trimmed.slice(0, eq).trim()
    let val = trimmed.slice(eq + 1).trim()
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1)
    }
    if (!process.env[key]) process.env[key] = val
  }
}

async function main() {
  loadEnv(join(process.cwd(), '.env.local'))
  const to = process.argv[2] || 'pervezali.dev@gmail.com'
  const result = await sendDummyPlayReceipt(to)
  console.log(result)
  if (!result.sent) process.exit(1)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
