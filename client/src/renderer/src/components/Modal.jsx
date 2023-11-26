/**
 * @file Modal.jsx
 * @brief Modal component for displaying content in a dialog box or popup.
 *
 * @component
 * @param {object} props - Component props
 * @param {React.Node} props.children - The content to be displayed inside the modal.
 * @param {function} props.onClose - Function to be called when the modal is closed.
 *
 * @example
 * <Modal onClose={handleClose}>
 *   <p>This is a modal</p>
 * </Modal>
 */

import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import '../assets/styles/Modal.css'

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
