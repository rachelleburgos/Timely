import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'

import ErrorBoundary from './components/common/ErrorBoundary/ErrorBoundary'
import LoadingPage from './pages/Loading/Loading'

// Lazy load the pages with delay
const AuthPage = React.lazy(() => import('./pages/Auth/Auth'))
const NotFoundPage = React.lazy(import('./pages/NotFound/NotFound'))
const DashboardPage = React.lazy(() => import('./pages/Dashboard/Dashboard'))

// Wrapper component that includes the ErrorBoundary
const ErrorBoundaryWrapper = ({ children }) => <ErrorBoundary>{children}</ErrorBoundary>

ErrorBoundaryWrapper.propTypes = {
  children: PropTypes.node.isRequired
}

// Main App component
function App() {
  return (
    <Router>
      {/* All the routes are wrapped in the ErrorBoundaryWrapper component */}
      {/* Suspense is used to show a fallback component while the page is loading, in this case the LoadingPage component */}
      <ErrorBoundaryWrapper>
        <Routes>
          {/* AuthPage */}
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingPage />}>
                <AuthPage />
              </Suspense>
            }
          />
          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<LoadingPage />}>
                <DashboardPage />
              </Suspense>
            }
          />
          {/* NotFoundPage */}
          <Route
            path="*"
            element={
              <Suspense fallback={<LoadingPage />}>
                <NotFoundPage />
              </Suspense>
            }
          />
          {/* Add more routes as needed here... */}
        </Routes>
      </ErrorBoundaryWrapper>
    </Router>
  )
}

export default App
