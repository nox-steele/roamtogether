import { useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom'
import './App.css'
import { mockItinerary, mockTasks, mockExpenses, mockTravelers, mockTrip, mockPastTrips } from './data'

// Activity type icons
const activityIcons = {
  transport: '✈️',
  accommodation: '🏨',
  food: '🍽️',
  attraction: '🎫',
}

// Home Page - Create trip
function Home() {
  const navigate = useNavigate()
  const [tripName, setTripName] = useState('')

  const handleCreateTrip = () => {
    if (tripName.trim()) {
      const tripId = Math.random().toString(36).substring(2, 10)
      navigate(`/trip/${tripId}`, { state: { name: tripName } })
    }
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>RoamTogether</h1>
        <p>Plan adventures together. Vote on destinations. Split costs.</p>
      </div>
      
      <div className="create-trip">
        <input
          type="text"
          placeholder="Trip name (e.g., Summer 2026 Europe)"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />
        <button onClick={handleCreateTrip}>Create Trip</button>
      </div>

      <div className="home-links">
        <Link to="/trips" className="view-past-trips-link">View Past Trips →</Link>
      </div>
    </div>
  )
}

// Trip Page - Show trip details, destinations, invite link
function Trip() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const locationState = navigate.state
  const tripName = locationState?.name || 'My Trip'
  
  const [destinations, setDestinations] = useState(mockTrip.destinations)
  const [newDestination, setNewDestination] = useState('')
  const [showInvite, setShowInvite] = useState(false)

  const inviteLink = `https://trips.app/join/${tripId}`

  const handleAddDestination = () => {
    if (newDestination.trim()) {
      setDestinations([
        ...destinations,
        { id: Date.now(), name: newDestination, votes: 0 }
      ])
      setNewDestination('')
    }
  }

  const handleVote = (id) => {
    setDestinations(destinations.map(d => 
      d.id === id ? { ...d, votes: d.votes + 1 } : d
    ))
  }

  return (
    <div className="trip">
      <header>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>{tripName}</h1>
        <button className="invite-btn" onClick={() => setShowInvite(!showInvite)}>
          {showInvite ? 'Hide' : 'Invite'}
        </button>
      </header>

      {showInvite && (
        <div className="invite-section">
          <p>Share this link with your group:</p>
          <code>{inviteLink}</code>
        </div>
      )}

      <nav className="trip-nav">
        <Link to={`/trip/${tripId}/itinerary`} state={{ name: tripName }} className="nav-card">
          <span className="nav-icon">📅</span>
          <span className="nav-label">Itinerary</span>
        </Link>
        <Link to={`/trip/${tripId}/tasks`} state={{ name: tripName }} className="nav-card">
          <span className="nav-icon">✅</span>
          <span className="nav-label">Tasks</span>
        </Link>
        <Link to={`/trip/${tripId}/costs`} state={{ name: tripName }} className="nav-card">
          <span className="nav-icon">💰</span>
          <span className="nav-label">Costs</span>
        </Link>
      </nav>

      <section className="destinations">
        <h2>Destinations</h2>
        
        <div className="add-destination">
          <input
            type="text"
            placeholder="Add a destination..."
            value={newDestination}
            onChange={(e) => setNewDestination(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddDestination()}
          />
          <button onClick={handleAddDestination}>Add</button>
        </div>

        {destinations.length === 0 ? (
          <p className="empty-state">No destinations yet. Add one above!</p>
        ) : (
          <ul className="destination-list">
            {destinations.map(dest => (
              <li key={dest.id} className="destination-item">
                <span className="dest-name">{dest.name}</span>
                <div className="dest-actions">
                  <span className="votes">🔥 {dest.votes}</span>
                  <button onClick={() => handleVote(dest.id)}>Vote</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}

// Itinerary Page - Day-by-day timeline
function Itinerary() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const tripName = navigate.state?.name || 'My Trip'
  
  const [itinerary, setItinerary] = useState(mockItinerary)
  const [selectedDay, setSelectedDay] = useState(1)
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [newActivity, setNewActivity] = useState({ time: '', title: '', type: 'attraction', location: '' })

  const handleAddActivity = () => {
    if (newActivity.title.trim() && newActivity.time.trim()) {
      const updatedItinerary = itinerary.map(day => {
        if (day.day === selectedDay) {
          return {
            ...day,
            activities: [...day.activities, { id: Date.now(), ...newActivity }]
          }
        }
        return day
      })
      setItinerary(updatedItinerary)
      setNewActivity({ time: '', title: '', type: 'attraction', location: '' })
      setShowAddActivity(false)
    }
  }

  const currentDay = itinerary.find(d => d.day === selectedDay)

  return (
    <div className="itinerary">
      <header>
        <button className="back-btn" onClick={() => navigate(`/trip/${tripId}`, { state: { name: tripName } })}>← Trip</button>
        <h1>{tripName}</h1>
        <span className="header-subtitle">Itinerary</span>
      </header>

      <div className="day-tabs">
        {itinerary.map(day => (
          <button
            key={day.day}
            className={`day-tab ${selectedDay === day.day ? 'active' : ''}`}
            onClick={() => setSelectedDay(day.day)}
          >
            Day {day.day}
          </button>
        ))}
      </div>

      <div className="day-content">
        <div className="day-header">
          <h2>{currentDay?.date}</h2>
          <button className="add-btn" onClick={() => setShowAddActivity(true)}>+ Activity</button>
        </div>

        {showAddActivity && (
          <div className="add-activity-form">
            <input
              type="time"
              value={newActivity.time}
              onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
              placeholder="Time"
            />
            <input
              type="text"
              value={newActivity.title}
              onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
              placeholder="Activity title"
            />
            <select
              value={newActivity.type}
              onChange={(e) => setNewActivity({ ...newActivity, type: e.target.value })}
            >
              <option value="attraction">Attraction</option>
              <option value="food">Food</option>
              <option value="transport">Transport</option>
              <option value="accommodation">Accommodation</option>
            </select>
            <input
              type="text"
              value={newActivity.location}
              onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
              placeholder="Location"
            />
            <button onClick={handleAddActivity}>Add</button>
            <button className="cancel-btn" onClick={() => setShowAddActivity(false)}>Cancel</button>
          </div>
        )}

        <div className="timeline">
          {currentDay?.activities.map(activity => (
            <div key={activity.id} className="timeline-item">
              <div className="timeline-time">{activity.time}</div>
              <div className="timeline-marker">
                <span className="timeline-icon">{activityIcons[activity.type]}</span>
              </div>
              <div className="timeline-content">
                <h3>{activity.title}</h3>
                <p className="activity-location">📍 {activity.location}</p>
                {activity.notes && <p className="activity-notes">{activity.notes}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="map-section">
        <h3>🗺️ Map View</h3>
        <div className="map-placeholder">
          <p>Activities will appear on the map</p>
          <small>Integrate with map service (Google Maps, Mapbox) for live map</small>
        </div>
      </div>
    </div>
  )
}

// Tasks Page - Task delegation
function Tasks() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const tripName = navigate.state?.name || 'My Trip'
  
  const [tasks, setTasks] = useState(mockTasks)
  const [showAddTask, setShowAddTask] = useState(false)
  const [newTask, setNewTask] = useState({ title: '', assignee: '', dueDate: '' })
  const [filter, setFilter] = useState('all')

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), ...newTask, status: 'todo' }
      ])
      setNewTask({ title: '', assignee: '', dueDate: '' })
      setShowAddTask(false)
    }
  }

  const toggleStatus = (id) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t
    ))
  }

  const filteredTasks = tasks.filter(t => {
    if (filter === 'all') return true
    if (filter === 'todo') return t.status === 'todo'
    if (filter === 'done') return t.status === 'done'
    return true
  })

  const todoCount = tasks.filter(t => t.status === 'todo').length
  const doneCount = tasks.filter(t => t.status === 'done').length

  return (
    <div className="tasks">
      <header>
        <button className="back-btn" onClick={() => navigate(`/trip/${tripId}`, { state: { name: tripName } })}>← Trip</button>
        <h1>{tripName}</h1>
        <span className="header-subtitle">Tasks</span>
      </header>

      <div className="task-stats">
        <div className="stat">
          <span className="stat-number">{todoCount}</span>
          <span className="stat-label">To Do</span>
        </div>
        <div className="stat">
          <span className="stat-number">{doneCount}</span>
          <span className="stat-label">Done</span>
        </div>
      </div>

      <div className="task-filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
        <button className={filter === 'todo' ? 'active' : ''} onClick={() => setFilter('todo')}>To Do</button>
        <button className={filter === 'done' ? 'active' : ''} onClick={() => setFilter('done')}>Done</button>
      </div>

      <button className="add-task-btn" onClick={() => setShowAddTask(true)}>+ Add Task</button>

      {showAddTask && (
        <div className="add-task-form">
          <input
            type="text"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Task description"
          />
          <select
            value={newTask.assignee}
            onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
          >
            <option value="">Assign to...</option>
            {mockTravelers.map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button onClick={handleAddTask}>Add</button>
          <button className="cancel-btn" onClick={() => setShowAddTask(false)}>Cancel</button>
        </div>
      )}

      <ul className="task-list">
        {filteredTasks.map(task => (
          <li key={task.id} className={`task-item ${task.status}`}>
            <button className="task-checkbox" onClick={() => toggleStatus(task.id)}>
              {task.status === 'done' ? '✓' : '○'}
            </button>
            <div className="task-content">
              <span className={`task-title ${task.status}`}>{task.title}</span>
              <div className="task-meta">
                <span className="task-assignee">👤 {task.assignee}</span>
                <span className="task-due">📅 {task.dueDate}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Costs Page - Cost splitting
function Costs() {
  const { tripId } = useParams()
  const navigate = useNavigate()
  const tripName = navigate.state?.name || 'My Trip'
  
  const [expenses, setExpenses] = useState(mockExpenses)
  const [showAddExpense, setShowAddExpense] = useState(false)
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', paidBy: '' })
  const [showSplit, setShowSplit] = useState(false)

  const handleAddExpense = () => {
    if (newExpense.description.trim() && newExpense.amount && newExpense.paidBy) {
      setExpenses([
        ...expenses,
        { 
          id: Date.now(), 
          ...newExpense, 
          amount: parseFloat(newExpense.amount),
          splitAmong: mockTravelers.map(t => t.id)
        }
      ])
      setNewExpense({ description: '', amount: '', paidBy: '' })
      setShowAddExpense(false)
    }
  }

  // Calculate totals
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
  const perPerson = totalExpenses / mockTravelers.length

  // Calculate who owes whom
  const balances = {}
  mockTravelers.forEach(t => { balances[t.name] = 0 })

  expenses.forEach(expense => {
    const splitAmount = expense.amount / expense.splitAmong.length
    // The payer gets credited
    balances[expense.paidBy] += expense.amount
    // Everyone in the split gets debited
    expense.splitAmong.forEach(personId => {
      const person = mockTravelers.find(t => t.id === personId)
      if (person) {
        balances[person.name] -= splitAmount
      }
    })
  })

  return (
    <div className="costs">
      <header>
        <button className="back-btn" onClick={() => navigate(`/trip/${tripId}`, { state: { name: tripName } })}>← Trip</button>
        <h1>{tripName}</h1>
        <span className="header-subtitle">Costs</span>
      </header>

      <div className="cost-summary">
        <div className="summary-card">
          <span className="summary-label">Total Expenses</span>
          <span className="summary-value">${totalExpenses.toFixed(2)}</span>
        </div>
        <div className="summary-card">
          <span className="summary-label">Per Person</span>
          <span className="summary-value">${perPerson.toFixed(2)}</span>
        </div>
      </div>

      <button className="show-split-btn" onClick={() => setShowSplit(!showSplit)}>
        {showSplit ? 'Hide' : 'Show'} Split Details
      </button>

      {showSplit && (
        <div className="split-details">
          <h3>Balance Summary</h3>
          <ul className="balance-list">
            {Object.entries(balances).map(([person, balance]) => (
              <li key={person} className={`balance-item ${balance >= 0 ? 'positive' : 'negative'}`}>
                <span className="balance-person">{person}</span>
                <span className="balance-amount">
                  {balance >= 0 ? '+' : ''}${balance.toFixed(2)}
                  {balance >= 0 ? ' (is owed)' : ' (owes)'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button className="add-expense-btn" onClick={() => setShowAddExpense(true)}>+ Add Expense</button>

      {showAddExpense && (
        <div className="add-expense-form">
          <input
            type="text"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
            placeholder="Description"
          />
          <input
            type="number"
            value={newExpense.amount}
            onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            placeholder="Amount ($)"
            step="0.01"
          />
          <select
            value={newExpense.paidBy}
            onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
          >
            <option value="">Who paid?</option>
            {mockTravelers.map(t => (
              <option key={t.id} value={t.name}>{t.name}</option>
            ))}
          </select>
          <button onClick={handleAddExpense}>Add</button>
          <button className="cancel-btn" onClick={() => setShowAddExpense(false)}>Cancel</button>
        </div>
      )}

      <ul className="expense-list">
        {expenses.map(expense => (
          <li key={expense.id} className="expense-item">
            <div className="expense-info">
              <span className="expense-desc">{expense.description}</span>
              <span className="expense-paid">Paid by {expense.paidBy}</span>
            </div>
            <span className="expense-amount">${expense.amount.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Past Trips Page - Show all past trips
function PastTrips() {
  const navigate = useNavigate()
  
  // Filter trips where endDate is in the past (before today)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const trips = mockPastTrips.filter(trip => {
    const endDate = new Date(trip.endDate)
    return endDate < today
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return <span className="status-badge confirmed">✓ Confirmed</span>
      case 'completed':
        return <span className="status-badge completed">Completed</span>
      case 'planning':
        return <span className="status-badge planning">Planning</span>
      default:
        return null
    }
  }

  return (
    <div className="past-trips">
      <header>
        <button className="back-btn" onClick={() => navigate('/')}>← Back</button>
        <h1>Past Trips</h1>
      </header>

      {trips.length === 0 ? (
        <p className="empty-state">No past trips yet. Create a new trip to get started!</p>
      ) : (
        <ul className="trips-list">
          {trips.map(trip => (
            <li key={trip.id} className="trip-card">
              <div className="trip-header">
                <h2 className="trip-name">{trip.name}</h2>
                {getStatusBadge(trip.status)}
              </div>
              <div className="trip-details">
                <p className="trip-dates">📅 {trip.dates}</p>
                {trip.destination && (
                  <p className="trip-destination">📍 {trip.destination}</p>
                )}
              </div>
              <button className="view-trip-btn">View Details</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<PastTrips />} />
        <Route path="/trip/:tripId" element={<Trip />} />
        <Route path="/trip/:tripId/itinerary" element={<Itinerary />} />
        <Route path="/trip/:tripId/tasks" element={<Tasks />} />
        <Route path="/trip/:tripId/costs" element={<Costs />} />
      </Routes>
    </BrowserRouter>
  )
}
