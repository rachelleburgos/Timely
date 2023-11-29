/**
 * @file CalendarNavButton.jsx
 * @brief A button component for calendar navigation.
 *
 * This file defines the `CalendarNavButton` component, which is used for navigating through a calendar interface.
 * It is a specialized button that displays an icon, typically used for moving to the next or previous week/month in a calendar.
 * The component utilizes FontAwesome icons and requires a click handler function and an icon object as props.
 *
 * @requires prop-types - For prop type validation.
 * @requires @fortawesome/react-fontawesome - To render FontAwesome icons.
 *
 * @component
 * @param {object} props - Component props.
 * @param {function} props.handleClick - The function to call when the button is clicked, typically to change the calendar view.
 * @param {object} props.icon - The FontAwesome icon to display in the button (e.g., arrows for next/previous navigation).
 *
 * @example
 * <CalendarNavButton handleClick={goToNextWeek} icon={faArrowRight} />
 * <CalendarNavButton handleClick={goToPreviousWeek} icon={faArrowLeft} />
 */

import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CalendarNavButton = ({ handleClick, icon }) => {
  return (
    <button onClick={handleClick} className="calendar-nav-button">
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

CalendarNavButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired
}

export default CalendarNavButton
