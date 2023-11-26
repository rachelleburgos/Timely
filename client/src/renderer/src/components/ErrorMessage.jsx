/**
 * @file ErrorMessage.jsx
 * @brief A component for displaying error messages.
 *
 * @component
 * @param {object} props - Component props.
 * @param {string} props.message - The error message to display. Defaults to 'Unknown error'.
 * @param {function} props.retry - A function to be called when the retry button is clicked. If null, the retry button will not be displayed.
 *
 * @example
 * <ErrorMessage message="An error occurred" retry={retryFunction} />
 */

import PropTypes from 'prop-types'

const ErrorMessage = ({ message, retry }) => {
  return (
    <div>
      <p>Error: {message}</p>
      {retry && <button onClick={retry}>Retry</button>}
    </div>
  )
}

ErrorMessage.defaultProps = {
  message: 'Unknown error',
  retry: null
}

ErrorMessage.propTypes = {
  message: PropTypes.string,
  retry: PropTypes.func // retry is a function that will be called when the retry button is clicked
}

export default ErrorMessage
