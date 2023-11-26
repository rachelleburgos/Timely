import PropTypes from 'prop-types'

const InboxItem = ({ event, removeEventFromInbox, confirmDrop, setCurrentDraggedEventId }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', event.id)
    e.dataTransfer.effectAllowed = 'move'
    setCurrentDraggedEventId(event.id)
  }

  const handleDragEnd = () => {
    if (confirmDrop(event.id)) {
      removeEventFromInbox(event.id)
    }
    setCurrentDraggedEventId(null)
  }

  return (
    <div
      className="draggable-event"
      draggable="true"
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      role="listitem"
    >
      <h3>{event.title}</h3>
      <p>Duration: {event.duration || 'Unscheduled'}</p>
      {event.location && <p>Location: {event.location}</p>}
      {event.url && (
        <a href={event.url} target="_blank" rel="noopener noreferrer">
          More Info
        </a>
      )}
      {event.description && <p>Description: {event.description}</p>}
    </div>
  )
}

InboxItem.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.string,
    location: PropTypes.string,
    url: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  removeEventFromInbox: PropTypes.func.isRequired,
  confirmDrop: PropTypes.func.isRequired,
  setCurrentDraggedEventId: PropTypes.func.isRequired
}

export default InboxItem
