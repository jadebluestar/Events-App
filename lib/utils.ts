import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Tier, TIER_ORDER } from '../types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function canAccessTier(userTier: Tier, eventTier: Tier): boolean {
  const userTierIndex = TIER_ORDER.indexOf(userTier)
  const eventTierIndex = TIER_ORDER.indexOf(eventTier)
  return userTierIndex >= eventTierIndex
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function getNextTier(currentTier: Tier): Tier | null {
  const currentIndex = TIER_ORDER.indexOf(currentTier)
  if (currentIndex === TIER_ORDER.length - 1) return null
  return TIER_ORDER[currentIndex + 1]
}