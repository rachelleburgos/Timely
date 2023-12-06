import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import PropTypes from 'prop-types'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LoadingPage from './pages/Loading/Loading'

// Function to delay the import
const delay = (duration) => new Promise((resolve) => setTimeout(resolve, duration))

// Lazy load the pages with delay
const HomePage = React.lazy(
  () => delay(3000).then(() => import('./pages/Home/Home')) // Delays the import by 3000ms
)
const NotFoundPage = React.lazy(() => delay(3000).then(() => import('./pages/NotFound/NotFound')))

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
                <HomePage />
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
