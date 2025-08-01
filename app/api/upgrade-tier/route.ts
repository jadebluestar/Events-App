import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { Tier, TIER_ORDER } from '../../../types'

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { newTier } = body

    if (!newTier || !TIER_ORDER.includes(newTier)) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 })
    }

    // Update user metadata in Clerk
    const { clerkClient } = await import('@clerk/nextjs/server')
    
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        tier: newTier
      }
    })

    return NextResponse.json({ 
      success: true, 
      newTier,
      message: `Successfully upgraded to ${newTier} tier!` 
    })
  } catch (error) {
    console.error('Upgrade error:', error)
    return NextResponse.json({ error: 'Failed to upgrade tier' }, { status: 500 })
  }
}