import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from '@fullcalendar/interaction'

import InboxItem from './InboxItem'
import AddEventForm from './AddEventForm'

const InboxList = ({ events, setEvents }) => {
  useEffect(() => {
    // Create the Draggable for the external events list
    let draggable = new Draggable(document.getElementById('external-events'), {
      itemSelector: '.draggable-event',
      eventData: function (eventEl) {
        let event = JSON.parse(eventEl.getAttribute('data-event'))
        return {
          ...event,
          _id: event.id, // Preserve the original ID
          duration: '02:00'
        }
      }
    })

    // Cleanup function to destroy Draggable instance when the component unmounts
    return () => {
      if (draggable) {
        draggable.destroy()
      }
    }
  }, []) // Empty array ensures this effect runs once on mount

  const removeEventFromInbox = (eventId) => {
    // Update the events by filtering out the event with the given ID
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId))
  }

  const addEventToInbox = (newEvent) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      { ...newEvent, id: Math.random().toString(36).substr(2, 9) } // or use a more robust ID generation method
    ])
  }

  return (
    <div id="external-events">
      <h2>Inbox</h2>
      {events.map((event) => (
        <InboxItem key={event.id} event={event} removeEventFromInbox={removeEventFromInbox} />
      ))}
      <AddEventForm onAddEvent={addEventToInbox} />
    </div>
  )
}

InboxList.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired
}

export default InboxList
