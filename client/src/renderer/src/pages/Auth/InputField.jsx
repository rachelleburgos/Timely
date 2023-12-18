import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Field, ErrorMessage } from 'formik'
import { useState } from 'react'

export const InputField = ({
  icon,
  name,
  placeholder,
  label,
  isPassword,
  togglePasswordVisibility
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleToggleVisibility = () => {
    togglePasswordVisibility()
    setShowPassword(!showPassword)
  }

  return (
    <div className="input-icon-container">
      <FontAwesomeIcon icon={icon} className="input-icon" />
      <Field
        type={isPassword && !showPassword ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
        className="text-field"
        id={name}
      />
      <label htmlFor={name} className="label-float">
        {label}
      </label>
      {isPassword && (
        <FontAwesomeIcon
          icon={showPassword ? 'eye' : 'eye-slash'}
          className="toggle-icon"
          onClick={handleToggleVisibility}
        />
      )}
      <ErrorMessage name={name} component="div" className="errorMessage" />
    </div>
  )
}

InputField.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  isPassword: PropTypes.bool,
  togglePasswordVisibility: PropTypes.func
}

InputField.defaultProps = {
  placeholder: '',
  isPassword: false,
  togglePasswordVisibility: () => {}
}
