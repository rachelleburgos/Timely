import { useEffect } from 'react'
import PropTypes from 'prop-types'
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
  }, [])

  return (
    <div id="external-events">
      <h4>Inbox</h4>
      {events && events.map((event) => event && <InboxItem key={event.id} event={event} />)}
    </div>
  )
}

InboxList.propTypes = {
  events: PropTypes.array.isRequired
}

export default InboxList
