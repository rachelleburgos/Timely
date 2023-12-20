import { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { InputField } from './InputField'

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const initialValues = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false // Added for terms agreement
  }

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('This is a required field'),
    email: Yup.string().email('Invalid email address').required('This is a required field'),
    password: Yup.string()
      .required('This is a required field')
      .matches(
        passwordRegex,
        'Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character'
      ),
    confirmPassword: Yup.string()
      .required('Please confirm your password')
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms and services') // Validation for terms agreement
  })

  const onSubmit = (values) => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <InputField icon="user" name="name" label="Name" />
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
        <label>
          <Field type="checkbox" name="agreeToTerms" />I agree to the Terms and Services
        </label>
        <button type="submit">Sign Up</button>
      </Form>
    </Formik>
  )
}

export default SignUpForm
