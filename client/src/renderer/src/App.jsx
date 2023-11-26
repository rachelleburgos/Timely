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
