import { useState, useEffect } from 'react'

import Calendar from './components/Calendar.jsx'
import InboxList from './components/InboxList.jsx'

import './assets/styles/App.css'

function App() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetchEvents()
      .then((fetchedEvents) => {
        setEvents(fetchedEvents)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error)
        setIsLoading(false)
      })
  }, [])

  const fetchEvents = async () => {
    try {
      // TODO: Replace with actual API call to the backend
      return [
        { id: '1', title: 'Event 1', duration: '02:00' },
        { id: '2', title: 'Event 2', duration: '02:00' }
      ]
    } catch (error) {
      console.error('Failed to fetch events:', error)
      throw error // Re-throw the error to be caught by the calling code
    }
  }

  // TODO: Replace with actual error handling
  if (error) {
    return <div>Error: {error.message}</div>
  }

  // TODO: Replace with actual loading indicator
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="app">
      <Calendar events={events} setEvents={setEvents} />
      <InboxList events={events} setEvents={setEvents} />
    </div>
  )
}

export default App
