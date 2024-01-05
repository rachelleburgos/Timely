import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import 'react-datepicker/dist/react-datepicker.css'

// Define the validation schema using Yup
const InboxValidationSchema = Yup.object().shape({
  title: Yup.string()
    .required('Inbox item title is required')
    .min(1, 'Inbox item title should be at least 1 character')
    .max(50, 'Inbox item title cannot exceed 50 characters'),
  description: Yup.string()
    .required('Inbox item description is required')
    .min(1, 'Inbox item description should be at least 1 character')
    .max(1000, 'Inbox item description cannot exceed 1000 characters'),
  duration: Yup.number()
    .min(0, 'Inbox item duration cannot be less than 0 minutes')
    .max(1440, 'Inbox item duration cannot exceed 1440 minutes (24 hours)'),
  priority: Yup.number()
    .min(0, 'Inbox item priority cannot be less than 0')
    .max(5, 'Inbox item priority cannot exceed 5'),
  color: Yup.string().matches(/^#([0-9a-f]{3}){1,2}$/i, 'Please enter a valid color code'),
  faIcon: Yup.string()
    .min(1, 'Icon class should be at least 1 character')
    .max(50, 'Icon class cannot exceed 50 characters')
})

const InboxForm = () => {
  const initialValues = {
    title: '',
    description: '',
    duration: 60,
    priority: 0,
    color: '#FFFFFF',
    faIcon: 'fa-inbox'
  }

  const handleSubmit = (values) => {
    // TODO: Handle form submission
    console.log(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={InboxValidationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <Field name="title" type="text" />
        <ErrorMessage name="title" />

        <Field name="description" as="textarea" />
        <ErrorMessage name="description" />

        <Field name="duration" type="number" />
        <ErrorMessage name="duration" />

        <Field name="priority" type="number" />
        <ErrorMessage name="priority" />

        <Field name="color" type="text" />
        <ErrorMessage name="color" />

        <Field name="faIcon" type="text" />
        <ErrorMessage name="faIcon" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default InboxForm
