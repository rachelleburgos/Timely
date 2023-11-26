/**
 * @file App.jsx
 * @brief Main component of the React application that sets up routing and lazy loading.
 *
 * This file defines the `App` component, which is the main component of the React application.
 * It uses React Router for client-side routing and React's lazy loading feature to dynamically
 * load components. `Suspense` from React is used to render a fallback component (`LoadingPage`)
 * while the lazy-loaded components are being fetched.
 *
 * The application has routes for different pages, with the DashboardPage as the root route
 * and NotFoundPage for any unmatched routes (404 pages). More routes can be added as needed.
 *
 * @requires react
 * @requires react-router-dom - For client-side routing.
 * @requires ./pages/DashboardPage - Lazy loaded Dashboard page component.
 * @requires ./pages/NotFoundPage - Lazy loaded NotFound (404) page component.
 * @requires ./pages/LoadingPage - Component displayed while lazy loaded components are loading.
 *
 * @example
 * <Router>
 *   <Suspense fallback={<LoadingPage />}>
 *     <Routes>
 *       <Route path="/" element={<DashboardPage />} />
 *       <Route path="*" element={<NotFoundPage />} />
 *       Other Routes ...
 *     </Routes>
 *   </Suspense>
 * </Router>
 */

import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Lazy loading of components
const DashboardPage = lazy(() => import('./pages/DashboardPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))
const LoadingPage = lazy(() => import('./pages/LoadingPage'))

function App() {
  return (
    // Suspense is used to display a fallback component while the lazy loaded components are being loaded
    <Router>
      <Suspense fallback={<LoadingPage />}>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
          {/* Other Routes ... */}
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
