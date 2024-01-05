import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputField } from '../InputField/InputField'

// Regular Expressions
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const LogInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  let navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .matches(emailRegex, 'Invalid email address')
      .required('This is a required field')
      .transform((value) => value.replace(/['";]/g, '')),
    password: Yup.string()
      .required('This is a required field')
      .transform((value) => value.replace(/['";]/g, ''))
  })

  const handleSubmit = (values) => {
    console.log(values) // TODO: Replace this with a call to the API
    navigate('/dashboard')
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form>
          <InputField
            icon="envelope"
            name="email"
            label="Email"
            error={errors.email && touched.email ? errors.email : null}
          />
          <InputField
            icon="lock"
            name="password"
            label="Password"
            isPassword={true}
            togglePasswordVisibility={togglePasswordVisibility}
            error={errors.password && touched.password ? errors.password : null}
          />
          <button type="submit">Log In</button>
        </Form>
      )}
    </Formik>
  )
}

export default LogInForm
