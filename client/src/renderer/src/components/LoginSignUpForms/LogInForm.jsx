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

  // TODO: Replace this with a call to the API
  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ touched, errors }) => (
        <Form>
          {/* Email field */}
          <div className="input-icon-container">
            <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
            <Field
              type="email"
              name="email"
              placeholder=""
              className={`text-field ${touched.email && 'touched'}`}
              id="email"
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

          {/* Password field */}
          <div className="input-icon-container">
            <FontAwesomeIcon icon={faLock} className="input-icon" />
            <Field
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder=""
              className={`text-field ${touched.password && 'touched'}`}
              id="password"
            />
            <label htmlFor="password" className="label-float">
              Password
            </label>
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
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
