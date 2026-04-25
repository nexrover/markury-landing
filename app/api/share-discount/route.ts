import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/api/_lib/supabase'
import { notifyError } from '@/lib/bugsnag'

const ALLOWED_DOMAINS = [
  'twitter.com', 'x.com', 'facebook.com', 'fb.com',
  'linkedin.com', 'reddit.com', 'wa.me', 't.me',
  'web.whatsapp.com', 'instagram.com', 'threads.net',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp']

function isValidSocialUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return ALLOWED_DOMAINS.some(d => parsed.hostname.includes(d))
  } catch {
    return false
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const email = formData.get('email') as string | null
    const postLink = formData.get('post_link') as string | null
    const screenshot = formData.get('screenshot') as File | null

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
    }

    const normalizedEmail = email.toLowerCase().trim()

    // Check if already claimed
    const { data: existing } = await supabase
      .from('share_discount_claims')
      .select('id')
      .eq('email', normalizedEmail)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ error: 'This email has already claimed the discount.' }, { status: 409 })
    }

    // Must have either link or screenshot
    if (!postLink && !screenshot) {
      return NextResponse.json({ error: 'Please provide a post link or screenshot.' }, { status: 400 })
    }

    let screenshotUrl: string | null = null

    // Validate & upload screenshot
    if (screenshot) {
      if (screenshot.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Screenshot must be under 5MB.' }, { status: 400 })
      }
      if (!ALLOWED_TYPES.includes(screenshot.type)) {
        return NextResponse.json({ error: 'Only PNG, JPG, WEBP images are allowed.' }, { status: 400 })
      }

      const ext = screenshot.name.split('.').pop() || 'png'
      const fileName = `${normalizedEmail.replace(/[@.]/g, '_')}_${Date.now()}.${ext}`

      const buffer = Buffer.from(await screenshot.arrayBuffer())
      const { error: uploadError } = await supabase.storage
        .from('share-screenshots')
        .upload(fileName, buffer, {
          contentType: screenshot.type,
          upsert: false,
        })

      if (uploadError) {
        console.log(uploadError)
        await notifyError(uploadError, request, { context: { action: 'screenshot_upload' } })
        return NextResponse.json({ error: 'Failed to upload screenshot. Please try again.' }, { status: 500 })
      }

      const { data: urlData } = supabase.storage
        .from('share-screenshots')
        .getPublicUrl(fileName)

      screenshotUrl = urlData.publicUrl
    }

    // Validate post link
    if (postLink && !isValidSocialUrl(postLink)) {
      return NextResponse.json({ error: 'Please provide a valid social media post link.' }, { status: 400 })
    }

    // Insert claim record
    const { error: insertError } = await supabase
      .from('share_discount_claims')
      .insert({
        email: normalizedEmail,
        post_link: postLink || null,
        screenshot_url: screenshotUrl,
        discount_code: 'SHARE10',
        ip_address: request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || null,
        user_agent: request.headers.get('user-agent') || null,
      })

    if (insertError) {
      // Could be a race condition duplicate
      if (insertError.code === '23505') {
        return NextResponse.json({ error: 'This email has already claimed the discount.' }, { status: 409 })
      }
      await notifyError(insertError, request, { context: { action: 'insert_claim' } })
      return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, code: 'SHARE10' })

  } catch (err: any) {
    await notifyError(err, request, { context: { action: 'share_discount' } })
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
