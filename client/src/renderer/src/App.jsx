import { useState, useEffect } from 'react'

import Calendar from './components/Calendar.jsx'
import InboxList from './components/InboxList.jsx'

import './assets/styles/App.css'

function App() {
  const [calendarEvents, setCalendarEvents] = useState([])
  const [inboxEvents, setInboxEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch events from the backend
  useEffect(() => {
    setIsLoading(true)
    fetchEvents()
      .then((fetchedEvents) => {
        setInboxEvents(fetchedEvents) // Populate inbox events
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [])

  // Function to fetch events
  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/events')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      return data // Assuming your backend returns an array of events
    } catch (error) {
      console.error('Failed to fetch events:', error)
      throw error
    }
  }

  const removeEventFromInbox = (eventId) => {
    setInboxEvents((currentInboxEvents) =>
      currentInboxEvents.filter((event) => event.id !== eventId)
    )
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <Calendar
        events={calendarEvents}
        setEvents={setCalendarEvents}
        removeEventFromInbox={removeEventFromInbox}
      />
      <InboxList events={inboxEvents} setEvents={setInboxEvents} />
    </div>
  )
}

export default App
