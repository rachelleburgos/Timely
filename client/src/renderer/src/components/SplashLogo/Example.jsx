import SplashLogo from './SplashLogo.jsx'
import { useState } from 'react'

<<<<<<< HEAD
function Example(){
    const [loaddisplay,setDisplay] =useState("notAppear")
  const [fade_out,setFadeOutAnimation]=useState("")
  const [minuteAnimation,setMinuteAnimation]=useState("")
  const [hourAnimation,setHourAnimation]=useState("")
    const animate=()=>{
    setDisplay("notAppear")
    setFadeOutAnimation("")
    setMinuteAnimation("")
    setHourAnimation("")
    setInterval(loadingAnimation, 0.003);
=======
function Example() {
  const [loaddisplay, setDisplay] = useState('notAppear')
  const [fade_out, setFadeOutAnimation] = useState('')
  const [minuteAnimation, setMinuteAnimation] = useState('')
  const [hourAnimation, setHourAnimation] = useState('')
  const animate = () => {
    setDisplay('notAppear')
    setDisplayAnimation('')
    setMinuteAnimation('')
    setHourAnimation('')
    setInterval(loadingAnimation, 0.003)
>>>>>>> 9bc2a3f0bf882ca2aee9f65b2e35a2d69c514bdd
  }
  const loadingAnimation = () => {
    setDisplay('')
    setMinuteAnimation('startAnimationMinute')
    setHourAnimation('startAnimationHour')
    setFadeOutAnimation('fade_out')
  }

  return (
    <div>
      <SplashLogo
        isVisible={loaddisplay}
        fadeout={fade_out}
        hourAnimation={hourAnimation}
        minuteAnimation={minuteAnimation}
      />
    </div>
  )
}
export default Example
