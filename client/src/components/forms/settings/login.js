import { LOGIN } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const login = {
  name: 'login',
  text: 'Login',
  mutation: LOGIN,
  success_message: 'Successful Login, Please wait...',
  validationSchema: createSchema(['email', 'password']),
  fields: {
    email: {
      type: "email", 
      label: "Email", 
      required: true
    },
    password: {
      type: "password", 
      label: "Password", 
      required: true
    },
  }
}