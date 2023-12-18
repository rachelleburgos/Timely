import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputField } from './InputField'

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Required')
      .test('log', (value) => {
        console.log('Validating email:', value)
        return true // Just for logging, actual validation is done by email()
      }),
    password: Yup.string()
      .required('Password is required')
      .matches(
        passwordRegex,
        'Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <InputField icon="user" name="firstName" label="First Name" />
        <InputField icon="user" name="lastName" label="Last Name" />
        <InputField icon="envelope" name="email" label="Email" />
        <InputField
          icon="lock"
          name="password"
          label="Password"
          isPassword={true}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <InputField
          icon="lock"
          name="confirmPassword"
          label="Confirm Password"
          isPassword={true}
          togglePasswordVisibility={togglePasswordVisibility}
        />
        <button type="submit">Sign Up</button>
      </Form>
    </Formik>
  )
}

export default SignUpForm
