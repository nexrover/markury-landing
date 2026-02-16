export {}

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'set' | 'event' | 'consent',
      targetId: string,
      config?: { [key: string]: any }
    ) => void
  }
}
