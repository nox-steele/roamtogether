# Group Trip Planner - Specification

## Overview
Collaborative trip planning for groups — where everyone adds ideas, votes on destinations, splits costs, and shares an itinerary.

## Problem
Group trips are chaotic. WhatsApp for chat, separate apps for costs, no central place to plan together.

## Target Customer
- Friend groups planning vacations (3-10 people)
- Families planning reunions
- Couples planning honeymoons

## Tech Stack (MVP)
- Frontend: React + Vite (or Next.js)
- Backend: Supabase (auth + database + real-time)
- Hosting: Vercel
- Free tier: enough for MVP

## Data Model

### Trip
```json
{
  id: uuid,
  name: string,
  description: string,
  created_by: uuid,
  invite_code: string (shareable link),
  status: 'planning' | 'confirmed' | 'completed'
}
```

### Destination
```json
{
  id: uuid,
  trip_id: uuid,
  name: string,
  description: string,
  added_by: uuid,
  votes: number
}
```

### TripMember
```json
{
  id: uuid,
  trip_id: uuid,
  user_id: uuid,
  role: 'owner' | 'member'
}
```

### Expense
```json
{
  id: uuid,
  trip_id: uuid,
  description: string,
  amount: number,
  paid_by: uuid,
  split_between: uuid[]
}
```

## User Flows

### 1. Create Trip
- User creates trip → gets invite link
- Share link with group

### 2. Join Trip
- Click invite link → sign up/login → joined

### 3. Add Destinations
- Anyone in trip adds destination options
- Others see and vote

### 4. Vote
- One vote per person
- See results in real-time

### 5. Costs (V2)
- Add expenses
- See who owes what

## MVP Features (V1)
- [ ] Create trip with name
- [ ] Generate shareable invite link
- [ ] Join via link
- [ ] Add destination ideas
- [ ] Vote on destinations
- [ ] See vote results

## V2 Features - Post-Decision Planning
- [ ] **Destination confirmed** → Move to itinerary planning
- [ ] **Itinerary Builder** - Day-by-day timeline
  - Add activities per day
  - Drag to reorder
  - Assign owners

- [ ] **Transport** - Flights, trains, cars
  - Add transport details (flight numbers, pickup times)
  - Shared transport calendar

- [ ] **Accommodation** - Where staying
  - Add hotel/Airbnb details
  - Check-in/out dates

- [ ] **Task Delegation** - Who does what
  - Assign tasks (book restaurant, arrange transport)
  - Due dates
  - Status (todo/in-progress/done)

- [ ] **Cost splitting**
- [ ] **Booking links**
- [ ] **Export trip**

## V3 Features
- [ ] AI suggestions for activities
- [ ] Budget calculator
- [ ] Packing list generator

## Success Metrics
- Trips created
- Users per trip
- Votes cast
- Retention

## Competitors
- TripIt (individual)
- Polarsteps (individual)
- Splitwise (costs only)
- WhatsApp/Discord (no structure)
