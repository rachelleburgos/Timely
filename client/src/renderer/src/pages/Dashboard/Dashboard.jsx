import { useState, useEffect, useCallback } from 'react'

import Calendar from '../../components/Calendar/Calendar'
import InboxList from '../../components/Inbox/InboxList'

import fetchEvents from '../../utils/api/events'

function Dashboard() {
  const [calendarEvents, setCalendarEvents] = useState(
    JSON.parse(localStorage.getItem('calendarEvents')) || []
  )
  const [inboxEvents, setInboxEvents] = useState([])
  const [currentDraggedEventId, setCurrentDraggedEventId] = useState(null)

  useEffect(() => {
    fetchEvents().then((fetchedEvents) => {
      setInboxEvents(fetchedEvents)
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
