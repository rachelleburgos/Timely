import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Field, useField } from 'formik'
import { useState } from 'react'
import { Tooltip } from 'flowbite-react'

export const InputField = ({
  icon,
  name,
  placeholder,
  label,
  isPassword,
  togglePasswordVisibility
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [field, meta] = useField(name)
  const fieldHasError = meta.touched && meta.error
  const fieldClass = fieldHasError ? 'text-field error-field' : 'text-field'

  const handleToggleVisibility = () => {
    togglePasswordVisibility()
    setShowPassword(!showPassword)
  }

  return (
    <div className="input-icon-container">
      <FontAwesomeIcon icon={icon} className="input-icon" />
      <Field
        {...field}
        type={isPassword && !showPassword ? 'password' : 'text'}
        placeholder={placeholder}
        className={fieldClass}
        id={name}
      />
      <label htmlFor={name} className="label-float">
        {label}
      </label>
      {isPassword && (
        <FontAwesomeIcon
          icon={showPassword ? faEye : faEyeSlash}
          className="toggle-icon"
          onClick={handleToggleVisibility}
        />
      )}
      {fieldHasError && (
        <Tooltip content={meta.error} style="light">
          <FontAwesomeIcon icon={faCircleExclamation} className="error-icon" />
        </Tooltip>
      )}
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
