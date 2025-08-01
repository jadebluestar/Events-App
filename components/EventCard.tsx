import Image from 'next/image'
import { Calendar, MapPin, Lock } from 'lucide-react'
import { Event, TIER_COLORS, TIER_NAMES } from '../types'
import { formatDate, cn } from '../lib/utils'

interface EventCardProps {
  event: Event
  isAccessible: boolean
}

export default function EventCard({ event, isAccessible }: EventCardProps) {
  return (
    <div className={cn(
      'event-card',
      !isAccessible && 'opacity-75 relative'
    )}>
      {/* Event Image */}
      <div className="relative h-48 bg-gray-200">
        <Image
          src={event.image_url || '/images/event-placeholder.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Tier Badge */}
        <div className="absolute top-3 right-3">
          <span className={cn('tier-badge', TIER_COLORS[event.tier])}>
            {TIER_NAMES[event.tier]}
          </span>
        </div>

        {/* Lock Overlay for Restricted Events */}
        {!isAccessible && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <Lock className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-medium">Upgrade Required</p>
            </div>
          </div>
        )}
      </div>

      {/* Event Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {event.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.event_date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            <span>Virtual Event</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6">
          {isAccessible ? (
            <button className="w-full btn-primary">
              Register Now
            </button>
          ) : (
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Upgrade to <span className="font-semibold capitalize">{TIER_NAMES[event.tier]}</span> to access this event
              </p>
              <button className="w-full bg-gray-100 text-gray-500 font-medium py-2 px-4 rounded-lg cursor-not-allowed">
                Upgrade Required
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}