import { useState, useEffect, useCallback } from 'react'

import Calendar from '../components/Calendar.jsx'
import InboxList from '../../components/Inbox/InboxList.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'

import fetchEvents from '../api/events.js'

function Dashboard() {
  const [calendarEvents, setCalendarEvents] = useState(
    JSON.parse(localStorage.getItem('calendarEvents')) || []
  )
  const [inboxEvents, setInboxEvents] = useState([])
  const [currentDraggedEventId, setCurrentDraggedEventId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchEvents()
      .then((fetchedEvents) => {
        setInboxEvents(fetchedEvents)
      })
      .catch((err) => {
        setError({ message: err.message, retry: fetchEvents })
      })
  }, [])

  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(calendarEvents))
  }, [calendarEvents])

  const removeEventFromInbox = useCallback((eventId) => {
    setInboxEvents((prev) => prev.filter((e) => e.id !== eventId))
  }, [])

  const confirmDrop = useCallback(
    (eventId) => {
      const isDropConfirmed = currentDraggedEventId === eventId
      setCurrentDraggedEventId(null)
      return isDropConfirmed
    },
    [currentDraggedEventId]
  )

  const retryFetchEvents = () => {
    setError(null)
    fetchEvents()
      .then((fetchedEvents) => {
        setInboxEvents(fetchedEvents)
      })
      .catch((err) => {
        setError({ message: err.message, retry: fetchEvents })
      })
  }

  if (error) {
    return <ErrorMessage message={error.message} retry={retryFetchEvents} />
  }

  return (
    <div>
      <Calendar
        events={calendarEvents}
        setEvents={setCalendarEvents}
        removeEventFromInbox={removeEventFromInbox}
        confirmDrop={confirmDrop}
      />
      <InboxList
        events={inboxEvents}
        setEvents={setInboxEvents}
        confirmDrop={confirmDrop}
        setCurrentDraggedEventId={setCurrentDraggedEventId}
      />
    </div>
  )
}

export default Dashboard
