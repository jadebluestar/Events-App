import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Link from 'next/link'
import { ArrowRight, Star, Users, Calendar, Shield } from 'lucide-react'

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Exclusive Events for
          <span className="text-blue-600"> Every Tier</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Access premium events based on your membership level. From free community meetups to platinum executive summits.
        </p>
        
        <SignedOut>
          <div className="space-x-4">
            <SignInButton mode="modal">
              <button className="btn-primary inline-flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </SignInButton>
          </div>
        </SignedOut>
        
        <SignedIn>
          <Link href="/events" className="btn-primary inline-flex items-center gap-2">
            View My Events <ArrowRight className="w-4 h-4" />
          </Link>
        </SignedIn>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-gray-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Free Tier</h3>
          <p className="text-sm text-gray-600">Community events and basic workshops</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-slate-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Silver Tier</h3>
          <p className="text-sm text-gray-600">Professional workshops and masterclasses</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-yellow-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Gold Tier</h3>
          <p className="text-sm text-gray-600">Exclusive conferences and VIP networking</p>
        </div>
        
        <div className="text-center p-6 bg-white rounded-lg shadow-sm border">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Platinum Tier</h3>
          <p className="text-sm text-gray-600">Elite summits and private dinners</p>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Unlock Premium Events?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Join thousands of professionals who have elevated their networking and learning experience with our tier-based event platform.
        </p>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors">
              Sign Up Now
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/events" className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors inline-block">
            Explore Events
          </Link>
        </SignedIn>
      </div>
    </div>
  )
}