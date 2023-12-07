import { useState } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import './Splash.css'
<<<<<<< HEAD
function SplashLogo(props){
const [beginAnimation,setAnimation]=useState(false);
const  animationqueue="";
return (<div className={`clockElement ${props.isVisible} ${props.fadeout}`}>
<div className={`hammerleft ${props.fadeout}`} ></div>
<div className={`hammerright ${props.fadeout}`}></div>
<div className={`clock ${props.fadeout}`}>
  <div className={`hour ${props.hourAnimation} ${props.fadeout}`}></div>
<div className={`minute ${props.minuteAnimation} ${props.fadeout}`}></div>
</div>
</div>
)
}
SplashLogo.propTypes={
  isVisible: PropTypes.string,
  fadeout: PropTypes.string,
  hourAnimation: PropTypes.string,
  minuteAnimation: PropTypes.string
}
export default SplashLogo;
=======
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
>>>>>>> 9bc2a3f0bf882ca2aee9f65b2e35a2d69c514bdd
