import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

// Adding icons to the library
library.add(faEnvelope, faEye, faEyeSlash, faLock)

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required')
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <div className="input-icon-container">
          <Field type="email" name="email" placeholder="Email" className="text-field" />
          <FontAwesomeIcon icon={faEnvelope} className="input-icon email-icon" />
        </div>
        <ErrorMessage name="email" component="div" />

        <div className="input-icon-container">
          <Field
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            className="text-field"
          />
          <FontAwesomeIcon icon={faLock} className="input-icon lock-icon" />
          <FontAwesomeIcon
            icon={showPassword ? faEye : faEyeSlash}
            className="input-icon toggle-icon"
            onClick={togglePasswordVisibility}
          />
        </div>
        <ErrorMessage name="password" component="div" />

        <button type="submit">Log In</button>
      </Form>
    </Formik>
  )
}

export default LogInForm
