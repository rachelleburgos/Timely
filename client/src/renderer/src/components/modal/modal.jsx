import PropTypes from 'prop-types'

function Modal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) {
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const eventName = event.target.elements.eventName.value
    onSubmit(eventName)
    onClose() // Close the modal after submission
  }

  return (
    <div
      className="modal-overlay"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className="modal">
        <h2 id="modal-title">Enter Event Name</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="eventName">
            Event name:
            <input name="eventName" type="text" id="eventName" />
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
