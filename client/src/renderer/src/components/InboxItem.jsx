import PropTypes from 'prop-types' // Corrected the import
import Glob from './Glob'
const InboxItem = ({ event, removeEventFromInbox }) => {
  // Optional: A handler that could be called to remove an event after a certain action
  const handleDragEnd = () => {
    // Assuming you want to remove the event from the inbox when the drag ends
    // This logic might need to be adjusted based on when you want to trigger this
    removeEventFromInbox(event.id)
  }

  return (
    <div
      className="draggable-event"
      onClick={() => (Glob.Ipop = true)}
      data-event={JSON.stringify(event)}
      // Optional: if you want to handle the end of the drag action
      onDragEnd={handleDragEnd}
    >
      {event.title}
    </div>
  )
}

InboxItem.propTypes = {
  event: PropTypes.object.isRequired,
  removeEventFromInbox: PropTypes.func.isRequired // This prop should be required if you're using it
}

export default InboxItem
