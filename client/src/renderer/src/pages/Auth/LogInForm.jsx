import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputField } from './InputField'

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
      .required('This is a required field'),
    password: Yup.string().required('This is a required field')
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
      {() => (
        <Form>
          <InputField icon="envelope" name="email" label="Email" />
          <InputField
            icon="lock"
            name="password"
            label="Password"
            isPassword={true}
            togglePasswordVisibility={togglePasswordVisibility}
          />
          <button type="submit">Log In</button>
        </Form>
      )}
    </Formik>
  )
}

export default LogInForm
