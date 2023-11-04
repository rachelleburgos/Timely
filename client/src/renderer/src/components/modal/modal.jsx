import PropTypes from 'prop-types'

function Modal({ isOpen, eventDetails, setEventDetails, onClose, onSubmit }) {
  if (!isOpen) {
    return null
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(eventDetails)
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
            <input
              name="eventName"
              type="text"
              id="eventName"
              value={eventDetails.eventName}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="startDate">
            Start date:
            <input
              name="startDate"
              type="date"
              id="startDate"
              value={eventDetails.startDate}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="startTime">
            Start time:
            <input
              name="startTime"
              type="time"
              id="startTime"
              value={eventDetails.startTime}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="endDate">
            End date:
            <input
              name="endDate"
              type="date"
              id="endDate"
              value={eventDetails.endDate}
              onChange={handleInputChange}
            />
          </label>
          <label htmlFor="endTime">
            End time:
            <input
              name="endTime"
              type="time"
              id="endTime"
              value={eventDetails.endTime}
              onChange={handleInputChange}
            />
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
  eventDetails: PropTypes.shape({
    eventName: PropTypes.string,
    startDate: PropTypes.string,
    startTime: PropTypes.string,
    endDate: PropTypes.string,
    endTime: PropTypes.string
  }).isRequired,
  setEventDetails: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Modal
