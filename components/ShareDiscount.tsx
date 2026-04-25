'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Copy01Icon, CheckmarkCircle02Icon, Upload04Icon, Link01Icon, Tick01Icon, ArrowRight01Icon, SparklesIcon, Share08Icon } from 'hugeicons-react'
import Link from 'next/link'

const SHARE_TEXT = "I just discovered Markury, a beautiful screen annotation tool for teachers, presenters & designers. Draw, highlight & annotate directly on your screen! Check it out 👉 https://www.markury.app"
const SHARE_URL = "https://www.markury.app"

const SOCIAL_PLATFORMS = [
  { name: 'X', icon: '𝕏', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(SHARE_TEXT)}`, color: 'bg-black' },
  { name: 'Facebook', icon: 'f', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SHARE_URL)}&quote=${encodeURIComponent(SHARE_TEXT)}`, color: 'bg-[#1877F2]' },
  { name: 'LinkedIn', icon: 'in', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(SHARE_URL)}`, color: 'bg-[#0A66C2]' },
  { name: 'Reddit', icon: 'r', url: `https://reddit.com/submit?url=${encodeURIComponent(SHARE_URL)}&title=${encodeURIComponent('Markury — Screen Annotation Made Simple')}`, color: 'bg-[#FF4500]' },
  { name: 'WhatsApp', icon: 'W', url: `https://wa.me/?text=${encodeURIComponent(SHARE_TEXT)}`, color: 'bg-[#25D366]' },
  { name: 'Telegram', icon: 'T', url: `https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_TEXT)}`, color: 'bg-[#0088cc]' },
]

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const colors = ['#FACC15', '#FB923C', '#A3F635', '#C084FC', '#22D3EE', '#FB7185', '#fff']
    const pieces: { x: number; y: number; w: number; h: number; color: string; vx: number; vy: number; rot: number; rv: number; opacity: number }[] = []

    for (let i = 0; i < 150; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height * -1,
        w: Math.random() * 10 + 5,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 4 + 2,
        rot: Math.random() * 360,
        rv: (Math.random() - 0.5) * 10,
        opacity: 1,
      })
    }

    let frame: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      pieces.forEach(p => {
        if (p.opacity <= 0) return
        alive = true
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.05
        p.rot += p.rv
        if (p.y > canvas.height) p.opacity -= 0.02
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.globalAlpha = Math.max(0, p.opacity)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })
      if (alive) frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[100] pointer-events-none" />
}

export default function ShareDiscount() {
  const [step, setStep] = useState(1)
  const [linkCopied, setLinkCopied] = useState(false)
  const [postLink, setPostLink] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState('')
  const [verifyMode, setVerifyMode] = useState<'link' | 'screenshot'>('link')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [email, setEmail] = useState('')
  const [alreadyClaimed, setAlreadyClaimed] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const copyShareLink = async () => {
    await navigator.clipboard.writeText(SHARE_TEXT)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2500)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setError('Screenshot must be under 5MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }
    setScreenshot(file)
    setScreenshotPreview(URL.createObjectURL(file))
    setError('')
  }

  const isValidSocialUrl = (url: string) => {
    try {
      const u = new URL(url)
      const validDomains = ['twitter.com', 'x.com', 'facebook.com', 'fb.com', 'linkedin.com', 'reddit.com', 'wa.me', 't.me', 'web.whatsapp.com', 'instagram.com', 'threads.net']
      return validDomains.some(d => u.hostname.includes(d))
    } catch {
      return false
    }
  }

  const handleSubmit = useCallback(async () => {
    setError('')
    setLoading(true)

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      setLoading(false)
      return
    }

    try {
      const formData = new FormData()
      formData.append('email', email)

      if (verifyMode === 'link') {
        if (!postLink) { setError('Please paste your post link'); setLoading(false); return }
        if (!isValidSocialUrl(postLink)) { setError('Please paste a valid social media post link'); setLoading(false); return }
        formData.append('post_link', postLink)
      } else {
        if (!screenshot) { setError('Please upload a screenshot'); setLoading(false); return }
        formData.append('screenshot', screenshot)
      }

      const res = await fetch('/api/share-discount', { method: 'POST', body: formData })
      const data = await res.json()

      if (!res.ok) {
        if (res.status === 409) { setAlreadyClaimed(true); setError('') }
        else setError(data.error || 'Something went wrong. Please try again.')
        setLoading(false)
        return
      }

      setStep(3)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [email, verifyMode, postLink, screenshot])

  const copyCode = async () => {
    await navigator.clipboard.writeText('SHARE10')
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2500)
  }

  return (
    <section className="container-narrow">
      {showConfetti && <ConfettiCanvas />}

      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 border border-orange-200/60 rounded-full text-sm font-medium text-orange-700 mb-6">
          <Share08Icon className="w-4 h-4" /> Share & Save
        </div>
        <h1 className="section-heading mb-4">
          Share Markury,{' '}
          <span className="marker-underline marker-underline--orange">get 10% off</span>
        </h1>
        <p className="section-subheading">
          Love Markury? Share it with a friend and unlock an exclusive discount code for your next purchase.
        </p>
      </div>

      {/* Steps indicator */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-16 max-w-lg mx-auto px-4">
        {[1, 2, 3].map(s => (
          <div key={s} className={`flex items-center gap-2 sm:gap-3 ${s < 3 ? 'flex-1' : ''}`}>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 flex-shrink-0 ${
              step >= s ? 'bg-markury-orange text-gray-900 shadow-lg shadow-orange-200' : 'bg-gray-100 text-gray-400'
            }`}>
              {step > s ? <Tick01Icon className="w-4 h-4 sm:w-5 sm:h-5" /> : s}
            </div>
            {s < 3 && <div className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${step > s ? 'bg-markury-orange' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-4">
        {/* STEP 1: Share */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Share08Icon className="w-7 h-7 text-markury-orange" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Share Markury</h2>
              <p className="text-gray-600 text-sm sm:text-base">Share on your favorite social platform or send it directly to a friend</p>
            </div>

            {/* Pre-populated share text */}
            <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 mb-6 border border-gray-100">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">{SHARE_TEXT}</p>
              <button onClick={copyShareLink} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all">
                {linkCopied ? <><Tick01Icon className="w-4 h-4 text-green-500" /> Copied!</> : <><Copy01Icon className="w-4 h-4" /> Copy message</>}
              </button>
            </div>

            {/* Social icons */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 mb-8">
              {SOCIAL_PLATFORMS.map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 p-3 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all hover:-translate-y-0.5">
                  <div className={`w-10 h-10 ${p.color} rounded-xl flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110`}>
                    {p.icon}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">{p.name}</span>
                </a>
              ))}
            </div>

            <button onClick={() => setStep(2)}
              className="btn-primary w-full justify-center gap-2" style={{ backgroundColor: 'var(--markury-orange)' }}>
              I&apos;ve shared it <ArrowRight01Icon className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* STEP 2: Verify */}
        {step === 2 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 animate-fadeIn">
            <div className="text-center mb-8">
              <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckmarkCircle02Icon className="w-7 h-7 text-markury-orange" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Verify Your Share</h2>
              <p className="text-gray-600 text-sm sm:text-base">Upload a screenshot of your post or paste the post link</p>
            </div>

            {/* Email */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-markury-orange/30 focus:border-markury-orange transition-all" />
            </div>

            {/* Toggle */}
            <div className="flex gap-2 mb-6 bg-gray-100 rounded-xl p-1">
              <button onClick={() => { setVerifyMode('link'); setError('') }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${verifyMode === 'link' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                <Link01Icon className="w-4 h-4" /> Paste link
              </button>
              <button onClick={() => { setVerifyMode('screenshot'); setError('') }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${verifyMode === 'screenshot' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                <Upload04Icon className="w-4 h-4" /> Upload screenshot
              </button>
            </div>

            {/* Link input */}
            {verifyMode === 'link' && (
              <div className="mb-6">
                <input type="url" value={postLink} onChange={e => setPostLink(e.target.value)} placeholder="https://twitter.com/you/status/..."
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-markury-orange/30 focus:border-markury-orange transition-all" />
                <p className="text-xs text-gray-400 mt-2">Supported: Twitter/X, Facebook, LinkedIn, Reddit, WhatsApp, Telegram, Instagram, Threads</p>
              </div>
            )}

            {/* Screenshot upload */}
            {verifyMode === 'screenshot' && (
              <div className="mb-6">
                <input type="file" ref={fileRef} accept="image/*" onChange={handleFileChange} className="hidden" />
                {screenshotPreview ? (
                  <div className="relative rounded-2xl overflow-hidden border border-gray-200">
                    <img src={screenshotPreview} alt="Screenshot preview" className="w-full max-h-64 object-contain bg-gray-50" />
                    <button onClick={() => { setScreenshot(null); setScreenshotPreview(''); if(fileRef.current) fileRef.current.value = '' }}
                      className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-lg border border-gray-200 hover:bg-white transition-colors">
                      <span className="text-xs font-medium text-gray-600">Remove</span>
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()}
                    className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center gap-3 hover:border-markury-orange/40 hover:bg-orange-50/30 transition-all group cursor-pointer">
                    <Upload04Icon className="w-8 h-8 text-gray-300 group-hover:text-markury-orange transition-colors" />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-600">Click to upload screenshot</p>
                      <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                    </div>
                  </button>
                )}
              </div>
            )}

            {error && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">{error}</div>}
            {alreadyClaimed && (
              <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-700">
                <p className="font-semibold mb-1">Already claimed!</p>
                <p>This email has already claimed the discount. Each user can only claim once.</p>
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => { setStep(1); setError(''); setAlreadyClaimed(false) }}
                className="px-6 py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
                Back
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className="btn-primary flex-1 justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed" style={{ backgroundColor: 'var(--markury-orange)' }}>
                {loading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Verifying...</>
                ) : (
                  <>Verify & Claim <ArrowRight01Icon className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Reveal code */}
        {step === 3 && (
          <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-6 sm:p-10 animate-fadeIn text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-markury-yellow to-markury-orange rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-200">
              <SparklesIcon className="w-8 h-8 text-gray-900" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">🎉 Your Discount Code</h2>
            <p className="text-gray-600 mb-8">Thanks for sharing! Here&apos;s your exclusive 10% discount code:</p>

            <div className="relative inline-block mb-6">
              <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 border-2 border-dashed border-markury-orange rounded-2xl px-8 sm:px-12 py-5">
                <span className="text-3xl sm:text-4xl font-extrabold tracking-[0.15em] text-gray-900">SHARE10</span>
              </div>
            </div>

            <div className="mb-8 flex flex-col sm:flex-row justify-center gap-3">
              <button onClick={copyCode}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all hover:-translate-y-0.5 shadow-lg">
                {codeCopied ? <><Tick01Icon className="w-5 h-5 text-markury-lime" /> Copied!</> : <><Copy01Icon className="w-5 h-5" /> Copy Code</>}
              </button>
              <Link href="/?discount=SHARE10#pricing" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-gray-900 rounded-xl font-semibold hover:opacity-90 transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-200"
                style={{ backgroundColor: 'var(--markury-orange)' }}>
                Go to Checkout <ArrowRight01Icon className="w-5 h-5" />
              </Link>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-2">How to use:</p>
              <ol className="text-sm text-gray-600 space-y-2 list-decimal list-inside">
                <li>Go to the <a href="/#pricing" className="text-markury-orange font-medium hover:underline">pricing page</a> and choose your plan</li>
                <li>At checkout, enter the code <span className="font-bold text-gray-900">SHARE10</span></li>
                <li>Enjoy 10% off your purchase! 🎉</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
