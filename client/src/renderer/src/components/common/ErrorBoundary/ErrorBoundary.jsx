import { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

// Adding icons to the library
library.add(faArrowsRotate)

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
    this.retry = this.retry.bind(this)
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error }
  }

  componentDidCatch(error, errorInfo) {
    // Update the state with error information
    this.setState({ error: error, errorInfo: errorInfo })

    // Log the error to Sentry
    Sentry.captureException(error, { extra: errorInfo })
  }

  retry() {
    // Reset the state before reloading the page
    this.setState({ hasError: false, error: null, errorInfo: null })
    window.location.reload()
  }

  // Render the fallback UI if an error occurs
  render() {
    if (this.state.hasError) {
      return (
        this.props.customFallback || (
          <div>
            <h1>Something went wrong.</h1>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            <FontAwesomeIcon icon={faArrowsRotate} className="input-icon" onClick={this.retry} />
          </div>
        )
      )
    }

    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  customFallback: PropTypes.element
}

export default ErrorBoundary
