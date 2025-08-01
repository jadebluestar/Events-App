export type Tier = 'free' | 'silver' | 'gold' | 'platinum'

export interface Event {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string | null
  tier: Tier
  created_at?: string
}

export interface User {
  id: string
  tier: Tier
}

export const TIER_COLORS = {
  free: 'bg-gray-100 text-gray-800 border-gray-300',
  silver: 'bg-slate-100 text-slate-800 border-slate-300',
  gold: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  platinum: 'bg-purple-100 text-purple-800 border-purple-300'
} as const

export const TIER_ORDER = ['free', 'silver', 'gold', 'platinum'] as const

export const TIER_NAMES = {
  free: 'Free',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum'
} as const