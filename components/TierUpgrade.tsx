'use client'

import { useState } from 'react'
import { ArrowUp, Loader2 } from 'lucide-react'
import { Tier, TIER_NAMES } from '../types'
import { getNextTier } from '../lib/utils'

interface TierUpgradeProps {
  currentTier: Tier
  onUpgrade: () => void
}

export default function TierUpgrade({ currentTier, onUpgrade }: TierUpgradeProps) {
  const [upgrading, setUpgrading] = useState(false)
  const nextTier = getNextTier(currentTier)

  if (!nextTier) {
    return (
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
            <ArrowUp className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="font-semibold text-purple-900">Platinum Member</p>
            <p className="text-sm text-purple-600">You have the highest tier!</p>
          </div>
        </div>
      </div>
    )
  }

  const handleUpgrade = async () => {
    try {
      setUpgrading(true)
      
      const response = await fetch('/api/upgrade-tier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTier: nextTier }),
      })

      if (!response.ok) {
        throw new Error('Failed to upgrade tier')
      }

      // Reload the page to refresh user data and events
      window.location.reload()
      onUpgrade()
    } catch (error) {
      console.error('Upgrade failed:', error)
      alert('Failed to upgrade tier. Please try again.')
    } finally {
      setUpgrading(false)
    }
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <ArrowUp className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold text-blue-900">
              Upgrade to {TIER_NAMES[nextTier]}
            </p>
            <p className="text-sm text-blue-600">
              Unlock exclusive events and features
            </p>
          </div>
        </div>
        
        <button
          onClick={handleUpgrade}
          disabled={upgrading}
          className="btn-primary flex items-center gap-2 min-w-[100px] justify-center"
        >
          {upgrading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Upgrading...</span>
            </>
          ) : (
            <>
              <ArrowUp className="w-4 h-4" />
              <span>Upgrade</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}