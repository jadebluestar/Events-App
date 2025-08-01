import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { supabase } from '../../../lib/supabase'
import { Tier } from '../../../types'
import { canAccessTier } from '../../../lib/utils'

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user data from Clerk
    const { clerkClient } = await import('@clerk/nextjs/server')
    const user = await clerkClient.users.getUser(userId)
    const userTier = (user.publicMetadata?.tier as Tier) || 'free'

    // Fetch all events from Supabase
    const { data: allEvents, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date', { ascending: true })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    // Filter events based on user tier
    const accessibleEvents = allEvents?.filter(event => 
      canAccessTier(userTier, event.tier as Tier)
    ) || []

    return NextResponse.json({
      events: accessibleEvents,
      allEvents: allEvents || [],
      userTier
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}