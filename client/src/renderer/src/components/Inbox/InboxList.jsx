import { useRef } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'

import InboxItem from './InboxItem'
import EventForm from '../EventForm/EventForm'

import { useDraggable } from '../../hooks/useDraggable'

const InboxList = ({ events, setEvents }) => {
  const inboxRef = useRef(null)
  useDraggable(inboxRef)

  const removeEventFromInbox = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId))
  }

  const addEventToInbox = (event) => {
    setEvents((prevEvents) => [...prevEvents, { ...event, id: uuidv4() }])
  }

  return (
    <div id="inbox-list" ref={inboxRef}>
      <h2>Inbox</h2>
      {events.map((event) => (
        <InboxItem
          key={event.id || uuidv4()}
          event={event}
          removeEventFromInbox={removeEventFromInbox}
        />
      ))}
      <EventForm onAddEvent={addEventToInbox} isForInbox={true} />
    </div>
  )
}

InboxList.propTypes = {
  events: PropTypes.array.isRequired,
  setEvents: PropTypes.func.isRequired
}

export default InboxList
