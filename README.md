

# Tier-Based Event Showcase
---


##  Objective
Build a responsive and elegant web application that allows logged-in users to view a list of events based on their user tier (**Free**, **Silver**, **Gold**, **Platinum**).  
A user should only see events available to their tier or any lower tier.

---
<img width="1895" height="864" alt="image" src="https://github.com/user-attachments/assets/58e79115-4898-4230-b8d5-76a869cad77a" />

---

## 🛠 Tech Stack
- **Frontend**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Authentication**: [Clerk.dev](https://clerk.com/)
- **Database**: [Supabase (PostgreSQL)](https://supabase.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

##  Features & Requirements

### 1. Authentication
- Integrated **Clerk.dev** for login and signup.
- Restricted the event listing page to authenticated users.
- Stored user tier in **Clerk Public Metadata** (e.g., `"tier": "silver"`).

### 2. Event Data (Supabase)
- Table name: `events`  
Schema:
  - `id`: UUID (Primary Key)
  - `title`: Text
  - `description`: Text
  - `event_date`: Timestamp
  - `image_url`: Text
  - `tier`: Enum (`free`, `silver`, `gold`, `platinum`)

- Seeded with **8 events** (2 per tier).

### 3. Tier-Based Filtering
- Fetched events from **Supabase**.
- Displayed only events matching the user’s tier or below.  
  - Example: **Gold** users see Free, Silver, and Gold events (not Platinum).

### 4. Frontend UI
- Built with **Tailwind CSS** (responsive & mobile-friendly).
- Event cards include:
  - Title
  - Description
  - Date
  - Tier badge (color-coded)
  - Image (with placeholder support)

---

## 🔥 Bonus Features
- Loading states and error handling.
- Upgrade prompt for events above the user’s tier.
- **Tier Upgrade Simulation**: Update Clerk metadata for testing.
- Enabled **Row-Level Security (RLS)** in Supabase for tier-based access.

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd tier-event-showcase
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/events
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/events

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

### 4. Database Setup (Supabase)

Run this SQL in **Supabase SQL Editor**:

```sql
-- Create enum for tiers
CREATE TYPE tier_enum AS ENUM ('free', 'silver', 'gold', 'platinum');

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  tier tier_enum NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Seed sample events
INSERT INTO events (title, description, event_date, image_url, tier) VALUES
('Free Webinar: Intro to Programming', 'Learn the basics of programming.', '2025-08-15 10:00:00+00', '/images/event-placeholder.jpg', 'free'),
('Community Meetup', 'Join our community for networking and discussions.', '2025-08-20 18:00:00+00', '/images/event-placeholder.jpg', 'free'),
('Silver Workshop: React Fundamentals', 'Deep dive into React concepts.', '2025-08-25 14:00:00+00', '/images/event-placeholder.jpg', 'silver'),
('Silver Masterclass: UI/UX Design', 'Professional design principles and tools.', '2025-09-01 16:00:00+00', '/images/event-placeholder.jpg', 'silver'),
('Gold Conference: Advanced Development', 'Exclusive for advanced developers.', '2025-09-10 09:00:00+00', '/images/event-placeholder.jpg', 'gold'),
('Gold VIP Networking Event', 'Connect with industry leaders.', '2025-09-15 19:00:00+00', '/images/event-placeholder.jpg', 'gold'),
('Platinum Summit: Tech Leadership', 'Elite summit for tech leaders.', '2025-09-25 08:00:00+00', '/images/event-placeholder.jpg', 'platinum'),
('Platinum Private Dinner', 'Exclusive dinner with pioneers.', '2025-10-05 20:00:00+00', '/images/event-placeholder.jpg', 'platinum');

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Basic read policy for testing
CREATE POLICY "Allow read access for all" ON events
FOR SELECT USING (true);
```

---

### 5. Run Development Server

```bash
npm run dev
```

Open: **[http://localhost:3000](http://localhost:3000)**

---

### 👤 Demo Users

Create users in Clerk and assign tiers via **Public Metadata**:

```json
{
  "tier": "silver"
}
```

Example tiers:

* **Free**: Default
* **Silver**: `"tier": "silver"`
* **Gold**: `"tier": "gold"`
* **Platinum**: `"tier": "platinum"`



###  Project Structure

```bash
tier-event-showcase/
├── app/             # Next.js App Router pages
├── components/      # Reusable UI components
├── lib/             # Supabase and utility functions
├── types/           # TypeScript type definitions
└── public/          # Static assets
```


###  License

This project is created for [Psypher AI Internship Assignment](https://www.psypher.ai/).


