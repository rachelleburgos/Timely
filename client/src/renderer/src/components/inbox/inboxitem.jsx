import { PropTypes } from 'prop-types'

const InboxItem = ({ event }) => {
  return (
    <div className="draggable-event" data-event={JSON.stringify(event)}>
      {event.title}
    </div>
  )
}

InboxItem.propTypes = {
  event: PropTypes.object.isRequired
}

export default InboxItem
