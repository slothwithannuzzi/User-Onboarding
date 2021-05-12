import * as yup from 'yup'

export const schema = yup.object().shape({
  first_name: yup.string().min(3, "Must be at least 3 characters!").required("Username is required!"),
  email: yup.string().email("Must be a valid email!").required("Email is required!"),
  password: yup.string().min(8, "Must be at least 8 characters!").required('Password is required!'),
  service: yup.boolean().isTrue(),
}) 