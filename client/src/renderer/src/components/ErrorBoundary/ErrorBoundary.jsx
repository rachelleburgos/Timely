/**
 * @file ErrorBoundary.jsx
 * @brief ErrorBoundary component for catching JavaScript errors in child component trees.
 *
 * This component is an error boundary used to catch JavaScript errors in its child component tree,
 * log these errors to Sentry, and display a fallback UI. The fallback UI can be customized via props.
 * It's typically used in higher-level components like the app root or main page layouts to prevent
 * the entire app from crashing due to uncaught errors. It also includes a retry mechanism that
 * attempts to reload the component tree in case of an error.
 *
 * @component
 * @param {object} props - Component props
 * @param {React.Node} props.children - The child components that the ErrorBoundary is wrapping.
 * @param {React.Element} [props.customFallback] - Optional custom fallback UI to be displayed in case of an error.
 *
 * @example
 * <ErrorBoundary customFallback={<CustomErrorComponent />}>
 *   <MyComponent />
 * </ErrorBoundary>
 */

import { Component } from 'react'
import PropTypes from 'prop-types'
import * as Sentry from '@sentry/react'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })

    this.logErrorToSentry(error, errorInfo)
  }

  logErrorToSentry(error, errorInfo) {
    Sentry.captureException(error, { extra: errorInfo })
  }

  retry() {
    window.location.reload()
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.customFallback || (
          <div>
            <h1>Something went wrong.</h1>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
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
