import { useState, useEffect } from 'react'
import LogInForm from '../../components/LoginSignUpForms/LogInForm'
import SignUpForm from '../../components/LoginSignUpForms/SignUpForm'
import { GoogleLogin } from '@react-oauth/google'

import './Auth.css'
import './Grained'

const AuthForm = () => {
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    // Assuming grained.js is included in your HTML and available globally
    window.grained('#container', {
      animate: false,
      patternWidth: 100,
      patternHeight: 100,
      grainOpacity: 0.03,
      grainDensity: 1,
      grainWidth: 1,
      grainHeight: 1
    })

    const interactiveLayer = document.querySelector('.interactive-layer')

    if (!interactiveLayer) {
      console.error('Interactive layer not found')
      return
    }

    let mouseX = 0
    let mouseY = 0
    let posX = 0
    let posY = 0

    const move = () => {
      // Easing effect: The layer moves a fraction of the distance towards the mouse coordinates
      posX += (mouseX - posX) * 0.01 // Adjust the 0.1 to control the speed of the easing
      posY += (mouseY - posY) * 0.01 // Adjust the 0.1 to control the speed of the easing

      interactiveLayer.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
      requestAnimationFrame(move)
    }

    const handleMouseMove = (event) => {
      // Set the mouse coordinates
      mouseX = event.clientX - interactiveLayer.offsetWidth / 2
      mouseY = event.clientY - interactiveLayer.offsetHeight / 2
    }

    document.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

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
            onSuccess={(response) => console.log(response)}
            onFailure={(response) => console.log(response)}
          />
        </div>
      </div>
    </div>
  )
}

export default AuthForm
