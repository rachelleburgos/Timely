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
      <div className="draggable-event__title">{event.title}</div>
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
