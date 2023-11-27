/**
 * @file Modal.jsx
 * @brief Modal component for displaying content in a dialog box or popup.
 *
 * This Modal component is designed to display overlay content such as dialogs or popups.
 * It accepts any React node as children to be rendered inside the modal. The modal can be closed
 * by a provided onClose callback function, which is triggered when clicking outside the modal area.
 * This component utilizes a React ref to manage clicks outside the modal content for closing it.
 *
 * The modal creates an overlay backdrop to focus user attention on the modal content and provides
 * an effective UI for presenting additional information, confirmations, forms, or other interactions
 * without leaving the current page context.
 *
 * @component
 * @param {object} props - Component props.
 * @param {React.Node} props.children - The content to be displayed inside the modal.
 * @param {function} props.onClose - Function to be called when the modal is closed, either by clicking
 *                                   outside the modal content or by other interactions as defined in the usage context.
 *
 * @example
 * <Modal onClose={handleClose}>
 *   <p>This is a modal</p>
 * </Modal>
 */

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
