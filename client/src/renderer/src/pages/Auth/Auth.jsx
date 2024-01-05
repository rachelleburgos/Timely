import { useState } from 'react'
import LogInForm from './components/LogInForm/LogInForm'
import SignUpForm from './components/SignUpForm/SignUpForm'
import { GoogleLogin } from '@react-oauth/google'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faEnvelope,
  faEye,
  faEyeSlash,
  faLock,
  faUser,
  faCircleExclamation
} from '@fortawesome/free-solid-svg-icons'

import './Auth.css'
import { useGrainEffect } from '../../hooks/useGrained'

// Add FontAwesome icons to the library
library.add(faEnvelope, faEye, faEyeSlash, faLock, faUser, faCircleExclamation)

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true)

  // Add the grain effect to the background
  useGrainEffect('.interactive-layer')

  const toggleForm = () => {
    setShowLogin(!showLogin)
  }

  return (
    <div id="container">
      <div className="auth-form-container">
        {/* Gradient background circles */}
        <div className="gradients-container">
          <div className="gradient-circle color1"></div>
          <div className="gradient-circle color2"></div>
          <div className="gradient-circle color3"></div>
          <div className="gradient-circle color4"></div>
          <div className="gradient-circle color5 interactive-layer"></div>
        </div>
        {/* Conditional rendering of the login or signup form */}
        <div className="form-container">
          {showLogin ? (
            <>
              <h1>Welcome back to Timely</h1>
              <LogInForm />
              <p>
                Don&apos;t have an account?{' '}
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
                Already have an account?{' '}
                <button onClick={toggleForm} className="toggle-form-button">
                  Log In
                </button>
              </p>
            </>
          )}

          <div className="divider">
            <span id="divider-text">or</span>
          </div>

          <GoogleLogin
            // TODO: Replace this with a call to the API
            onSuccess={(response) => console.log(response)}
            onError={(response) => console.log(response)}
            type="icon"
            shape="circle"
          />
        </div>
      </div>
    </div>
  )
}

export default AuthForm
