import { NextResponse } from 'next/server'
import { supabase } from '@/app/api/_lib/supabase'

export async function GET(request: Request) {
  try {
    // Verify the request is coming from Vercel Cron or an authorized source
    // In local development, you can bypass this or test it directly.
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // A lightweight query to keep the database active and prevent it from pausing.
    // We limit to 1 row to minimize bandwidth and database load.
    const { data, error } = await supabase
      .from('share_discount_claims')
      .select('id')
      .limit(1)

    if (error) {
      console.error('Supabase keep-alive error:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Supabase pinged successfully to prevent pausing.',
      timestamp: new Date().toISOString(),
      data
    })
  } catch (error: any) {
    console.error('Supabase keep-alive exception:', error)
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
