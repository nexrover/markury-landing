/** Structured API logs for license / Play paywall routes (no secrets). */

export function maskLicenseKey(key?: string | null): string | null {
  if (!key) return null
  const trimmed = key.trim()
  if (trimmed.length <= 8) return `${trimmed.slice(0, 2)}…`
  return `${trimmed.slice(0, 8)}…${trimmed.slice(-4)}`
}

export function maskToken(token?: string | null): string | null {
  if (!token) return null
  if (token.length <= 12) return `${token.slice(0, 4)}…`
  return `${token.slice(0, 8)}…${token.slice(-6)}`
}

type LogLevel = 'info' | 'warn' | 'error'

function emit(
  level: LogLevel,
  scope: string,
  message: string,
  meta?: Record<string, unknown>
) {
  const payload = {
    ts: new Date().toISOString(),
    scope,
    message,
    ...meta,
  }
  const line = JSON.stringify(payload)
  if (level === 'error') console.error(line)
  else if (level === 'warn') console.warn(line)
  else console.log(line)
}

export function apiLog(
  scope: string,
  message: string,
  meta?: Record<string, unknown>
) {
  emit('info', scope, message, meta)
}

export function apiWarn(
  scope: string,
  message: string,
  meta?: Record<string, unknown>
) {
  emit('warn', scope, message, meta)
}

export function apiError(
  scope: string,
  message: string,
  meta?: Record<string, unknown>
) {
  emit('error', scope, message, meta)
}
