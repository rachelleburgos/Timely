import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from '@fullcalendar/interaction'

import InboxItem from './InboxItem'

const InboxList = ({ events, setEvents }) => {
  // add setEvents here to update state
  useEffect(() => {
    new Draggable(document.getElementById('external-events'), {
      itemSelector: '.draggable-event',
      eventData: function (eventEl) {
        let event = JSON.parse(eventEl.getAttribute('data-event'))
        return {
          ...event, // spread the event to maintain all its properties
          duration: '02:00' // you can specify duration here if needed
        }
      }
    })
  }, [])

  // Function to remove an event from the inbox after dragging
  const removeEventFromInbox = (eventId) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== eventId))
  }

  return (
    <div id="external-events">
      <h2>Inbox</h2>
      {events &&
        events.map(
          (event) =>
            event && (
              <InboxItem key={event.id} event={event} removeEventFromInbox={removeEventFromInbox} />
            )
        )}
    </div>
  )
}

InboxList.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired // Add the setEvents function to the prop types
}

export default InboxList
