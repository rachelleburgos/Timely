import { useState } from 'react'
import LogInForm from '../../components/LoginSignUpForms/LogInForm'
import SignUpForm from '../../components/LoginSignUpForms/SignUpForm'

import './Auth.css'

const AuthForm = () => {
  // State to track whether to show the login form or the signup form
  const [showLogin, setShowLogin] = useState(true)

  // Function to toggle between login and signup forms
  const toggleForm = () => {
    setShowLogin(!showLogin)
  }

  return (
    <div className="form-container">
      {showLogin ? (
        <>
          <h1>Welcome back to Timely</h1>
          <LogInForm />
          <p>
            Don&apos;t have an account? {}
            <button onClick={toggleForm} className="toggle-form-button">
              Sign Up
            </button>
          </p>
        </>
      ) : (
        <>
          <h1>Welcome to Timely</h1>
          <SignUpForm />
          <p>
            Already have an account? {}
            <button onClick={toggleForm} className="toggle-form-button">
              Log In
            </button>
          </p>
        </>
      )}

      <div className="divider">
        <span id="divider-text">or</span>
      </div>
    </div>
  )
}

export default AuthForm
