import PropTypes from 'prop-types'

// TODO: Import a custom hook if complex logic is needed for managing the modal's state and lifecycle

function Modal({ isOpen, eventDetails, setEventDetails, onClose, onSubmit }) {
  // If the modal is not open, do not render anything
  if (!isOpen) {
    return null
  }

  // Handle changes to form inputs
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }))
  }

  // Handle the submission of the form
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(eventDetails)
    onClose() // Close the modal after submission
  }

  // TODO: Consider using a portal for rendering the modal to avoid issues with overflow and positioning
  return (
    <div
      className="modal-overlay"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      // TODO: Manage focus when the modal opens and ensure it traps focus within the modal for accessibility
    >
      <div className="modal">
        <h2 id="modal-title">Enter Event Details</h2>
        <form onSubmit={handleSubmit}>
          {/* Form inputs for event details */}
          <label htmlFor="eventName">
            Event name:
            <input
              name="eventName"
              type="text"
              id="eventName"
              value={eventDetails.eventName}
              onChange={handleInputChange}
              required // Ensure the input is not empty upon submission
            />
          </label>
          {/* Add other form fields here */}
          {/* Submit and close buttons */}
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  eventDetails: PropTypes.object.isRequired,
  setEventDetails: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
}

export default Modal
