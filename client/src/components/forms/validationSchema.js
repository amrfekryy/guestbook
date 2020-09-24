import * as Yup from 'yup';

export const createSchema = name => {
  const validations = {
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  }
  
  const selections = name === 'login' ? {
    email: validations.email,
    password: validations.password
  } : validations

  return Yup.object(selections)
}
