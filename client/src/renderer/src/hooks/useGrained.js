// hooks/useGrainEffect.js
import { useEffect } from 'react'

const GRAIN_SPEED = 0.01

export const useGrainEffect = (selector) => {
  useEffect(() => {
    const interactiveLayer = document.querySelector(selector)

    if (!interactiveLayer) {
      console.error('Interactive layer not found')
      return
    }

    let mouseX = 0
    let mouseY = 0
    let posX = 0
    let posY = 0

    const move = () => {
      posX += (mouseX - posX) * GRAIN_SPEED
      posY += (mouseY - posY) * GRAIN_SPEED

      interactiveLayer.style.transform = `translate3d(${posX}px, ${posY}px, 0)`
      requestAnimationFrame(move)
    }

    const handleMouseMove = (event) => {
      mouseX = event.clientX - interactiveLayer.offsetWidth / 2
      mouseY = event.clientY - interactiveLayer.offsetHeight / 2
    }

    document.addEventListener('mousemove', handleMouseMove)
    move()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [selector])
}
