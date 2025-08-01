export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string
          event_date: string
          image_url: string | null
          tier: 'free' | 'silver' | 'gold' | 'platinum'
          created_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          event_date: string
          image_url?: string | null
          tier: 'free' | 'silver' | 'gold' | 'platinum'
          created_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          event_date?: string
          image_url?: string | null
          tier?: 'free' | 'silver' | 'gold' | 'platinum'
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      tier_enum: 'free' | 'silver' | 'gold' | 'platinum'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}