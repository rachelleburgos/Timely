import { useState } from 'react'
import LogInForm from '../../components/LoginSignUpForms/LogInForm'
import SignUpForm from '../../components/LoginSignUpForms/SignUpForm'

// import './Auth.css'

const AuthForm = () => {
  // State to track whether to show the login form or the signup form
  const [showLogin, setShowLogin] = useState(true)

  // Function to toggle between login and signup forms
  const toggleForm = () => {
    setShowLogin(!showLogin)
  }

  return (
    <div>
      {showLogin ? (
        <>
          <h2>Welcome back to Timely</h2>
          <LogInForm />
          <p>
            Don&apos;t have an account?
            <button onClick={toggleForm}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <h2>Welcome to Timely</h2>
          <SignUpForm />
          <p>
            Already have an account?
            <button onClick={toggleForm}>Log In</button>
          </p>
        </>
      )}
    </div>
  )
}

export default AuthForm
