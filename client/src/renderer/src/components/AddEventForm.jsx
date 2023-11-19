import { useState } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import Glob from "./Glob.jsx"

const AddEventForm = ({ onAddEvent }) => {
  const [title, setTitle] = useState('')
  const [durationHours, setDurationHours] = useState('01')
  const [durationMinutes, setDurationMinutes] = useState('00')
  const [details, setDetails] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const duration = `${durationHours}:${durationMinutes}`
    onAddEvent({ title, duration, details })
    // Reset the form
    setTitle('')
    setDurationHours('01')
    setDurationMinutes('00')
    setDetails('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event Title"
        required
      />
      <div>
        <select value={durationHours} onChange={(e) => setDurationHours(e.target.value)}>
          {Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0')).map((hour) => (
            <option key={hour} value={hour}>
              {hour} hour(s)
            </option>
          ))}
        </select>
        <select value={durationMinutes} onChange={(e) => setDurationMinutes(e.target.value)}>
          {['00', '15', '30', '45'].map((minute) => (
            <option key={minute} value={minute}>
              {minute} minute(s)
            </option>
          ))}
        </select>
      </div>
      <textarea
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        placeholder="Event Details"
      />
      <button type="submit" id="submit-event-button">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  )
}

AddEventForm.propTypes = {
  onAddEvent: PropTypes.func.isRequired
}

export default AddEventForm
