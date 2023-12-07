import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoadingPage from './pages/Loading/Loading'

// Lazy load the pages with delay
const AuthPage = React.lazy(() => import('./pages/Auth/Auth'))
const NotFoundPage = React.lazy(import('./pages/NotFound/NotFound'))

// Wrapper component that includes the ErrorBoundary
const ErrorBoundaryWrapper = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>

ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

// Main App component
function App() {
  return (
    <Router>
      <ErrorBoundaryWrapper>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AuthPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Routes>
      </ErrorBoundaryWrapper>
    </Router>
  )
}

export default App
