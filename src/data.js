// Mock data for RoamTogether (Group Trip Planner)
// This data is used for the MVP without Supabase

export const mockTrip = {
  id: 'demo-trip-1',
  name: 'Summer 2026 Europe',
  dates: 'July 15 - July 25, 2026',
  travelers: [
    { id: 1, name: 'Alex', avatar: '👤' },
    { id: 2, name: 'Jordan', avatar: '👤' },
    { id: 3, name: 'Sam', avatar: '👤' },
    { id: 4, name: 'Riley', avatar: '👤' },
  ],
  destinations: [
    { id: 1, name: 'Paris, France', votes: 3 },
    { id: 2, name: 'Rome, Italy', votes: 2 },
    { id: 3, name: 'Barcelona, Spain', votes: 1 },
  ],
}

export const mockItinerary = [
  {
    day: 1,
    date: 'July 15, 2026',
    activities: [
      { id: 1, time: '10:00', title: 'Arrive at CDG Airport', type: 'transport', location: 'Paris CDG' },
      { id: 2, time: '14:00', title: 'Check into Hotel', type: 'accommodation', location: 'Hotel Le Marais' },
      { id: 3, time: '18:00', title: 'Welcome Dinner', type: 'food', location: 'Le Comptoir du Panthéon', notes: 'Reservations confirmed' },
    ],
  },
  {
    day: 2,
    date: 'July 16, 2026',
    activities: [
      { id: 4, time: '09:00', title: 'Eiffel Tower Visit', type: 'attraction', location: 'Champ de Mars', notes: 'Skip-the-line tickets booked' },
      { id: 5, time: '13:00', title: 'Lunch at Trocadéro', type: 'food', location: 'Café de la Paix' },
      { id: 6, time: '15:00', title: 'Louvre Museum', type: 'attraction', location: 'Louvre Museum', notes: 'Evening entry' },
    ],
  },
  {
    day: 3,
    date: 'July 17, 2026',
    activities: [
      { id: 7, time: '10:00', title: 'Montmartre Walking Tour', type: 'attraction', location: 'Montmartre' },
      { id: 8, time: '13:00', title: 'Sacré-Cœur Basilica', type: 'attraction', location: 'Basilica steps' },
      { id: 9, time: '19:00', title: 'Seine River Cruise', type: 'attraction', location: 'Bateaux Mouches', notes: 'Dinner cruise' },
    ],
  },
]

export const mockTasks = [
  { id: 1, title: 'Book flights', assignee: 'Alex', dueDate: '2026-04-01', status: 'done' },
  { id: 2, title: 'Reserve hotels', assignee: 'Jordan', dueDate: '2026-04-15', status: 'done' },
  { id: 3, title: 'Get travel insurance', assignee: 'Sam', dueDate: '2026-05-01', status: 'todo' },
  { id: 4, title: 'Book restaurant reservations', assignee: 'Riley', dueDate: '2026-06-01', status: 'todo' },
  { id: 5, title: 'Arrange airport transfer', assignee: 'Alex', dueDate: '2026-06-15', status: 'todo' },
  { id: 6, title: 'Create packing list', assignee: 'Sam', dueDate: '2026-07-01', status: 'todo' },
  { id: 7, title: 'Exchange currency', assignee: 'Jordan', dueDate: '2026-07-10', status: 'todo' },
  { id: 8, title: 'Download offline maps', assignee: 'Riley', dueDate: '2026-07-14', status: 'todo' },
]

export const mockExpenses = [
  { id: 1, description: 'Flights (Round trip)', amount: 2400, paidBy: 'Alex', splitAmong: [1, 2, 3, 4] },
  { id: 2, description: 'Hotel (10 nights @ $150/night)', amount: 1500, paidBy: 'Jordan', splitAmong: [1, 2, 3, 4] },
  { id: 3, description: 'Eiffel Tower tickets', amount: 120, paidBy: 'Sam', splitAmong: [1, 2, 3, 4] },
  { id: 4, description: 'Welcome dinner', amount: 200, paidBy: 'Alex', splitAmong: [1, 2, 3, 4] },
  { id: 5, description: 'Louvre tickets', amount: 80, paidBy: 'Riley', splitAmong: [1, 2, 3, 4] },
  { id: 6, description: 'Seine cruise', amount: 180, paidBy: 'Jordan', splitAmong: [1, 2, 3, 4] },
]

export const mockTravelers = [
  { id: 1, name: 'Alex' },
  { id: 2, name: 'Jordan' },
  { id: 3, name: 'Sam' },
  { id: 4, name: 'Riley' },
]

export const mockPastTrips = [
  {
    id: 'past-1',
    name: 'Tokyo Adventure',
    dates: 'March 10 - March 20, 2025',
    startDate: '2025-03-10',
    endDate: '2025-03-20',
    status: 'completed',
    destination: 'Tokyo, Japan',
  },
  {
    id: 'past-2',
    name: 'NYC Weekend',
    dates: 'November 15 - November 17, 2024',
    startDate: '2024-11-15',
    endDate: '2024-11-17',
    status: 'completed',
    destination: 'New York City, USA',
  },
  {
    id: 'past-3',
    name: 'Barcelona Dream',
    dates: 'June 1 - June 10, 2024',
    startDate: '2024-06-01',
    endDate: '2024-06-10',
    status: 'completed',
    destination: 'Barcelona, Spain',
  },
  {
    id: 'past-4',
    name: 'Costa Rica Retreat',
    dates: 'February 20 - February 28, 2024',
    startDate: '2024-02-20',
    endDate: '2024-02-28',
    status: 'completed',
    destination: 'Costa Rica',
  },
  {
    id: 'future-1',
    name: 'Hawaii Getaway',
    dates: 'August 15 - August 25, 2026',
    startDate: '2026-08-15',
    endDate: '2026-08-25',
    status: 'planning',
    destination: 'Hawaii, USA',
  },
]
