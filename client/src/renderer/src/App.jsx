import { useState, useEffect } from 'react'

import MyCalendar from './components/calendar/Calendar.jsx'
import InboxList from './components/inbox/InboxList.jsx'

import './assets/App.css'

function App() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchEvents().then((fetchedEvents) => {
      setEvents(fetchedEvents)
    })
  }, [])

  // Fetch events from API or other data source
  // TODO: Replace with actual API call to the backend
  const fetchEvents = async () => {
    return [
      { id: '1', title: 'Event 1', duration: '02:00' },
      { id: '2', title: 'Event 2', duration: '02:00' }
      // ... other events
    ]
  }

  if (events.length === 0) {
    return <div>Loading events...</div>
  }

  return (
    <div className="app">
      <MyCalendar />
      <InboxList events={events} />
    </div>
  )
}

export default App
