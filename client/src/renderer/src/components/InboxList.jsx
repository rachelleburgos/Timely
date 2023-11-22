import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Draggable } from '@fullcalendar/interaction'
import InboxItem from './InboxItem'
import AddEventForm from './AddEventForm'
// import moment from 'moment'
import Glob from './Glob.jsx'

const InboxList = ({ events, setEvents }) => {
  useEffect(() => {
    // Create the Draggable for the external events list
    let draggable = new Draggable(document.getElementById('external-events'), {
      itemSelector: '.draggable-event',
      eventData: function (eventEl) {
        let event = JSON.parse(eventEl.getAttribute('data-event'))

        Glob.userC = Glob.userCarray.find((o) => o.id == event.id)
        return {
          ...event,
          _id: event.id, // Preserve the original ID
          duration: Glob.userC.duration
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
    var ids = Math.random().toString(36).substr(2, 9)
    while (Glob.userCarray.find((o) => o.id == ids) != null) {
      ids = Math.random().toString(36).substr(2, 9)
    }
    Glob.userCarray.push({
      id: ids,
      title: newEvent.title,
      duration: newEvent.duration
    })
    setEvents((currentEvents) => [
      ...currentEvents,
      { ...newEvent, id: ids } // or use a more robust ID generation method
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
