import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './Modal.css'

const Modal = ({ children, onClose }) => {
  const modalRef = useRef()

  const handleClose = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClose)
    return () => document.removeEventListener('click', handleClose)
  }, [])

  return (
    <div className="modal-backdrop">
      <div className="modal-content" ref={modalRef}>
        {children}
      </div>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal
