export type CacheEntry = {
  text: string
  expiresAt: number
}

export function createInMemoryTextCache(ttlMs: number) {
  const cache = new Map<string, CacheEntry>()
  const inFlight = new Map<string, Promise<string>>()

  return {
    get(key: string) {
      const now = Date.now()
      const existing = cache.get(key)
      if (existing && existing.expiresAt > now) return existing.text
      return null
    },
    set(key: string, text: string) {
      cache.set(key, { text, expiresAt: Date.now() + ttlMs })
    },
    getInFlight(key: string) {
      return inFlight.get(key) ?? null
    },
    setInFlight(key: string, promise: Promise<string>) {
      inFlight.set(key, promise)
    },
    clearInFlight(key: string) {
      inFlight.delete(key)
    },
  }
}

