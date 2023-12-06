import { useState } from 'react'
import './Splash.css'
function SplashLogo(props) {
  const [beginAnimation, setAnimation] = useState(false)
  const animationqueue = ''
  return (
    <div className={`clockElement ${props.isVisible} ${props.fadeout}`}>
      <div className={`hammerleft ${props.fadeout}`}></div>
      <div className={`hammerright ${props.fadeout}`}></div>
      <div className={`clock ${props.disappear}`}>
        <div className={`hour ${props.hourAnimation} ${props.fadeout}`}></div>
        <div className={`minute ${props.minuteAnimation} ${props.fadeout}`}></div>
      </div>
    </div>
  )
}
export default SplashLogo
