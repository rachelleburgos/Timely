import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const EventFormSchema = Yup.object().shape({
  title: Yup.string()
    .required('Event title is required')
    .min(1, 'Event title should be at least 1 character')
    .max(50, 'Event title cannot exceed 50 characters'),
  description: Yup.string().max(1000, 'Event description cannot exceed 1000 characters'),
  location: Yup.string().max(200, 'Event location cannot exceed 200 characters'),
  start: Yup.date().required('Event start date and time is required'),
  end: Yup.date()
    .required('Event end date and time is required')
    .when(
      'start',
      (start, schema) =>
        start && schema.min(start, 'Event end date and time must be after start date and time')
    ),
  isAllDay: Yup.boolean(),
  priority: Yup.number()
    .min(0, 'Event priority cannot be less than 0')
    .max(5, 'Event priority cannot exceed 5'),
  color: Yup.string().matches(/^#([0-9a-f]{3}){1,2}$/i, 'Please enter a valid color code'),
  faIcon: Yup.string()
    .min(1, 'Icon class should be at least 1 character')
    .max(50, 'Icon class cannot exceed 50 characters'),
  isCompleted: Yup.boolean()
  // user and recurringEventId fields are typically handled separately, e.g., via a select dropdown or hidden input
})

const EventForm = () => (
  <Formik
    initialValues={{
      title: '',
      description: '',
      location: '',
      start: new Date(),
      end: new Date(),
      isAllDay: false,
      priority: 0,
      color: '#FFFFFF',
      faIcon: 'fa-calendar',
      isCompleted: false
      // TODO: FINISH THIS
    }}
    validationSchema={EventFormSchema}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        setSubmitting(false)
      }, 400)
    }}
  >
    {({ isSubmitting, setFieldValue }) => (
      <Form>
        <Field type="text" name="title" />
        <ErrorMessage name="title" component="div" />

        <Field type="text" name="description" />
        <ErrorMessage name="description" component="div" />

        <Field type="text" name="location" />
        <ErrorMessage name="location" component="div" />

        <DatePicker
          name="start"
          selected={(values) => values.start}
          onChange={(date) => setFieldValue('start', date)}
        />
        <ErrorMessage name="start" component="div" />

        <DatePicker
          name="end"
          selected={(values) => values.end}
          onChange={(date) => setFieldValue('end', date)}
        />
        <ErrorMessage name="end" component="div" />

        <Field type="checkbox" name="isAllDay" />
        <ErrorMessage name="isAllDay" component="div" />

        <Field type="number" name="priority" />
        <ErrorMessage name="priority" component="div" />

        <Field type="text" name="color" />
        <ErrorMessage name="color" component="div" />

        <Field type="text" name="faIcon" />
        <ErrorMessage name="faIcon" component="div" />

        <Field type="checkbox" name="isCompleted" />
        <ErrorMessage name="isCompleted" component="div" />

        {/* Additional fields for user and recurringEventId would go here */}

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    )}
  </Formik>
)

export default EventForm
