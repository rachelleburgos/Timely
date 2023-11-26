import PropTypes from 'prop-types'
import { addDays, format } from 'date-fns'

const WeekDayButtons = ({ currentWeekStart, onDayClick }) => {
  return (
    <div className="week-day-buttons">
      {Array.from({ length: 7 }, (_, index) => {
        const dayDate = addDays(currentWeekStart, index)
        const dayFormatted = format(dayDate, 'EEE')
        const dayNum = format(dayDate, 'd')
        const ariaLabel = `Go to ${dayFormatted}, ${dayNum}`
        return (
          <button
            key={index}
            onClick={() => onDayClick(index)}
            className="day-button"
            aria-label={ariaLabel}
          >
            {`${dayFormatted} ${dayNum}`}
          </button>
        )
      })}
    </div>
  )
}

WeekDayButtons.propTypes = {
  currentWeekStart: PropTypes.instanceOf(Date).isRequired,
  onDayClick: PropTypes.func.isRequired
}

export default WeekDayButtons
