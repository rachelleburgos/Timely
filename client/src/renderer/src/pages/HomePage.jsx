import PropTypes from 'prop-types'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = ({ onLoginSuccess }) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const navigate = useNavigate()

  const handleLogin = () => {
    setIsLoggingIn(true)
    setTimeout(() => {
      setIsLoggingIn(false)
      onLoginSuccess()
      navigate('/dashboard')
    }, 1000)
  }

  return (
    <div className="home-page">
      <h1>Welcome to Timely</h1>
      <button onClick={handleLogin} disabled={isLoggingIn}>
        {isLoggingIn ? 'Logging In...' : 'Log In'}
      </button>
      <Link to="/signup">Sign Up</Link>
    </div>
  )
}

HomePage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired
}

export default HomePage
