/**
 * @file CalendarWeekNavigation.jsx
 * @brief Component for navigating through days of a week in a calendar.
 *
 * The `CalendarWeekNavigation` component renders a set of buttons for each day of a given week.
 * It takes the starting date of the week and a click handler as props. Each button corresponds
 * to a day in the week, formatted to show the weekday and date. Clicking a button triggers the
 * provided `onDayClick` handler with the index of the day (relative to the start of the week).
 * This component is useful for calendar interfaces where users need to select or view different
 * days within a specific week.
 *
 * @requires prop-types - For prop type validation.
 * @requires date-fns - For date manipulation and formatting functions.
 *
 * @component
 * @param {object} props - Component props.
 * @param {Date} props.currentWeekStart - The starting date of the current week.
 * @param {function} props.onDayClick - Function to call when a day button is clicked, with the index of the day.
 *
 * @example
 * <CalendarWeekNavigation
 *   currentWeekStart={new Date()}
 *   onDayClick={(dayIndex) => console.log('Day clicked:', dayIndex)}
 * />
 */

import PropTypes from 'prop-types'
import { addDays, format } from 'date-fns'

const CalendarWeekNavigation = ({ currentWeekStart, onDayClick }) => {
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

CalendarWeekNavigation.propTypes = {
  currentWeekStart: PropTypes.instanceOf(Date).isRequired,
  onDayClick: PropTypes.func.isRequired
}

export default CalendarWeekNavigation
