import PropTypes from 'prop-types'

function Modal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const eventName = event.target.elements.eventName.value
    const startDate = event.target.elements.startDate.value
    const startTime = event.target.elements.startTime.value
    const endDate = event.target.elements.endDate.value
    const endTime = event.target.elements.endTime.value
    onSubmit({ eventName, startDate, startTime, endDate, endTime })
    onClose()
  }

  return (
    <div
      className="modal-overlay"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal">
        <h2 id="modal-title">Enter Event Details</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="eventName">
            Event name:
            <input name="eventName" type="text" id="eventName" />
          </label>
          <label htmlFor="startDate">
            Start date:
            <input name="startDate" type="date" id="startDate" />
          </label>
          <label htmlFor="startTime">
            Start time:
            <input name="startTime" type="time" id="startTime" />
          </label>
          <label htmlFor="endDate">
            End date:
            <input name="endDate" type="date" id="endDate" />
          </label>
          <label htmlFor="endTime">
            End time:
            <input name="endTime" type="time" id="endTime" />
          </label>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Modal
