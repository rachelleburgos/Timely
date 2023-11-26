import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const NavigationButton = ({ handleClick, icon }) => {
  return (
    <button onClick={handleClick} className="calendar-nav-button">
      <FontAwesomeIcon icon={icon} />
    </button>
  )
}

NavigationButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  icon: PropTypes.object.isRequired
}

export default NavigationButton
