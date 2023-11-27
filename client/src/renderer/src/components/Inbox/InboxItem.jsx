/**
 * @file InboxItem.jsx
 * @brief Component representing a draggable item in an inbox-style interface.
 *
 * This `InboxItem` component is designed for use in a draggable interface, representing an event
 * item within an inbox or list-like structure. It supports drag-and-drop interactions, allowing the
 * user to move the item between different areas of the interface. On drag start, it sets the current
 * dragged event ID and allows for a 'move' effect. On drag end, it checks if the drop is confirmed
 * and if so, removes the event from the inbox.
 *
 * The component displays event details like title, duration, location, URL, and description. The URL
 * is presented as a clickable link that opens in a new tab. It's a versatile component for interfaces
 * where events or items need to be organized or rescheduled through drag-and-drop interactions.
 *
 * @component
 * @param {object} props - Component props.
 * @param {object} props.event - The event data to be displayed.
 * @param {function} props.removeEventFromInbox - Function to remove the event from the inbox.
 * @param {function} props.confirmDrop - Function to confirm the drop action after dragging.
 * @param {function} props.setCurrentDraggedEventId - Function to set the ID of the currently dragged event.
 *
 * @example
 * <InboxItem
 *   event={myEvent}
 *   removeEventFromInbox={handleRemoveEvent}
 *   confirmDrop={handleConfirmDrop}
 *   setCurrentDraggedEventId={handleSetCurrentDraggedEventId}
 * />
 */

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
