import { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/react'

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

  render() {
    if (this.state.hasError) {
      // Use customFallback if provided, else default fallback UI
      return (
        this.props.customFallback || (
          <div>
            <h1>Something went wrong.</h1>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo && this.state.errorInfo.componentStack}
            </details>
            <button onClick={this.retry}>Retry</button>
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
