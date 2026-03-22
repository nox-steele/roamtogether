# RoamTogether

Collaborative group trip planning — from "where should we go?" to "here's the plan."

## Problem

Group trips are chaotic. WhatsApp for chat, separate apps for costs, no central place to plan together.

## Solution

RoamTogether handles the full group trip lifecycle:

1. **Vote** — Add destination ideas, everyone votes
2. **Plan** — Day-by-day itinerary
3. **Delegate** — Assign tasks (book restaurant, arrange transport)
4. **Split Costs** — Track expenses and who owes whom

## Tech Stack

- Frontend: React + Vite
- Backend: Supabase (auth + database + real-time)
- Hosting: Vercel

## Getting Started

```bash
npm install
npm run dev
```

## Features

### V1 (MVP)
- [x] Create trip with shareable invite link
- [x] Add destination ideas with voting
- [x] Itinerary planning (day-by-day)
- [x] Task delegation
- [x] Cost splitting
- [x] Past trips (auto-filters by end date)

### V2
- [ ] Real-time collaboration (Supabase)
- [ ] User authentication
- [ ] Mobile app

## Project Status

**Status:** In Development (Mock data, needs backend)

## Roadmap

See Notion for full roadmap: [Link to Projects database]

## Rollback

If something breaks, rollback to the last working version:

```bash
cd project-folder
git log --oneline          # find the last good commit
git reset --hard <commit>  # reset to that commit
git push --force           # push the rollback
```

Example (rollback to commit `abc1234`):
```bash
git reset --hard abc1234
git push --force
```

## License

MIT
