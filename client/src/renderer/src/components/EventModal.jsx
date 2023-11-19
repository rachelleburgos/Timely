import { useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

const EventModal = ({ isOpen, onClose, onSubmit, defaultDate }) => {
  const [title, setTitle] = useState('')
  const [duration, setDuration] = useState('08:00')
  // Initialize the date state with formatted defaultDate
  const [date, setDate] = useState(format(defaultDate, 'yyyy-MM-dd'))

  const handleSubmit = () => {
    // The onSubmit function needs to be updated to handle the date as well
    onSubmit({ title, duration, date })
    setTitle('')
    setDuration('06:30') // Reset to default duration if needed
    setDate(format(defaultDate, 'yyyy-MM-dd')) // Reset date to the default date
    onClose() // Close the modal after submission
  }

  return isOpen ? (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Event</h2>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="time"
          placeholder="Enter duration (HH:MM)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null
}

EventModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  defaultDate: PropTypes.instanceOf(Date).isRequired
}

export default EventModal
