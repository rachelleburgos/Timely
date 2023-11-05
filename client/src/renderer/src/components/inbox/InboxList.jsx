import { useEffect } from 'react'
import PropTypes from 'prop-types' // Import without braces
import { Draggable } from '@fullcalendar/interaction'

import InboxItem from './InboxItem'

const InboxList = ({ events }) => {
  useEffect(() => {
    new Draggable(document.getElementById('external-events'), {
      itemSelector: '.draggable-event',
      eventData: function (eventEl) {
        let event = JSON.parse(eventEl.getAttribute('data-event'))
        return event
      }
    })
  }, []) // Empty array means this effect runs once on mount

  return (
    <div id="external-events">
      <h4>Draggable Events</h4>
      {events.map((event) => (
        <InboxItem key={event.id} event={event} />
      ))}
    </div>
  )
}

InboxList.propTypes = {
  // Lowercase 'p' in propTypes
  events: PropTypes.array.isRequired
}

export default InboxList
