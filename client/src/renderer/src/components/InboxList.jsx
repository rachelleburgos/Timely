import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from '@fullcalendar/interaction'

import InboxItem from './InboxItem'

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

  return (
    <div id="external-events">
      <h2>Inbox</h2>
      {events.map((event) => (
        <InboxItem key={event.id} event={event} removeEventFromInbox={removeEventFromInbox} />
      ))}
    </div>
  )
}

InboxList.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired
}

export default InboxList
