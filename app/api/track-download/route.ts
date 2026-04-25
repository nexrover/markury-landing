import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/app/api/_lib/supabase'
import { notifyError } from '@/lib/bugsnag'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { platform } = body

    if (!platform) {
      return NextResponse.json({ error: 'Platform is required' }, { status: 400 })
    }

    const ipAddress = request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || null;
    const userAgent = request.headers.get('user-agent') || null;

    // Await the insert so it reliably executes before the function context ends
    const { error } = await supabase
      .from('download_logs')
      .insert({
        platform,
        ip_address: ipAddress,
        user_agent: userAgent
      })

    if (error) {
      await notifyError(error, request, { context: { action: 'track_download' } })
      // Even on error, we return success so we don't break anything on the client side
      console.error('Download tracking error:', error)
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    await notifyError(err, request, { context: { action: 'track_download' } })
    console.error('Download tracking exception:', err)
    // Return success to the client regardless so it doesn't interrupt their flow
    return NextResponse.json({ success: true })
  }
}
