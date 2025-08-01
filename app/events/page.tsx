'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import EventCard from '../../components/EventCard'
import TierUpgrade from '../../components/TierUpgrade'
import LoadingSpinner from '../../components/LoadingSpinner'
import { Event, Tier, TIER_NAMES } from '../../types'
import { canAccessTier } from '../../lib/utils'

export default function EventsPage() {
  const { user, isLoaded } = useUser()
  const [events, setEvents] = useState<Event[]>([])
  const [allEvents, setAllEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const userTier = (user?.publicMetadata?.tier as Tier) || 'free'

  useEffect(() => {
    if (isLoaded) {
      fetchEvents()
    }
  }, [isLoaded])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/events')
      
      if (!response.ok) {
        throw new Error('Failed to fetch events')
      }
      
      const data = await response.json()
      setAllEvents(data.allEvents || [])
      setEvents(data.events || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (!isLoaded || loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <h2 className="text-lg font-semibold text-red-800 mb-2">Error Loading Events</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={fetchEvents}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  const accessibleEvents = events
  const restrictedEvents = allEvents.filter(event => !canAccessTier(userTier, event.tier))

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Events</h1>
            <p className="text-gray-600">
              Welcome back! You're currently on the{' '}
              <span className="font-semibold capitalize text-gray-900">
                {TIER_NAMES[userTier]}
              </span>{' '}
              tier.
            </p>
          </div>
          <TierUpgrade currentTier={userTier} onUpgrade={fetchEvents} />
        </div>
      </div>

      {/* Available Events */}
      {accessibleEvents.length > 0 ? (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Available Events ({accessibleEvents.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {accessibleEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                isAccessible={true}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 mb-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No Events Available</h2>
            <p className="text-gray-600">
              There are currently no events available for your tier. Check back soon!
            </p>
          </div>
        </div>
      )}

      {/* Restricted Events (Upgrade Prompts) */}
      {restrictedEvents.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Upgrade to Access ({restrictedEvents.length})
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {restrictedEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                isAccessible={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}