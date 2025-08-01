'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import { Calendar, Home } from 'lucide-react';
import { TIER_COLORS, TIER_NAMES, Tier } from '@/types'; // ✅ Use absolute import if TS paths are configured
import { cn } from '@/lib/utils';

export default function Navigation() {
  const { user } = useUser();
  const userTier = (user?.publicMetadata?.tier as Tier) || 'free';

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Calendar className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">EventTier</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <SignedIn>
              <Link
                href="/"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <Link
                href="/events"
                className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </Link>

              {/* User Tier Badge */}
              <div
                className={cn(
                  'px-3 py-1 rounded-full text-white text-sm font-semibold',
                  TIER_COLORS[userTier] // ✅ Should return a Tailwind color class like bg-green-500
                )}
              >
                {TIER_NAMES[userTier]}
              </div>

              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-8 h-8',
                  },
                }}
              />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
}
