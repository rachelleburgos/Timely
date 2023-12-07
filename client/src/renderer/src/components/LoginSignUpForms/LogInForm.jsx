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
      {({ touched, errors }) => (
        <Form>
          <div className="input-icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <Field
              type="email"
              name="email"
              className={`text-field ${touched.email && 'touched'}`}
            />
            <label htmlFor="email" className="label-float">
              Email
            </label>
            <ErrorMessage
              name="email"
              component="div"
              className={`errorMessage ${errors.email && touched.email ? 'active' : ''}`}
            />
          </div>

          <div className="input-icon-container">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              className={`text-field ${touched.password && 'touched'}`}
            />
            <label htmlFor="password" className="label-float">
              Password
            </label>
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              className="toggle-icon"
              onClick={togglePasswordVisibility}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={`errorMessage ${errors.password && touched.password ? 'active' : ''}`}
            />
          </div>

          <button type="submit">Log In</button>
        </Form>
      )}
    </Formik>
  )
}

export default LogInForm
