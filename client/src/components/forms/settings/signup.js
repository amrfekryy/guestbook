import { SIGNUP } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const signup = {
  name: 'signup',
  text: 'Sign Up',
  mutation: SIGNUP,
  success_message: 'Successful Sign Up, Please wait...',
  validationSchema: createSchema(['name', 'email', 'password', 'password2']),
  fields: {
    name: {
      type: "text", 
      label: "Name", 
      required: true
    },
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
    password2: {
      type: "password", 
      label: "Confirm Password", 
      required: true
    }
  }
}