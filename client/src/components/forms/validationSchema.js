import * as Yup from 'yup';

export const createSchema = fields => {
  const validations = {
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
    title: Yup.string().required('Required'),
    description: Yup.string().required('Required'),
  }
  
  const selections = fields.reduce((obj, field) => ({...obj, [field]: validations[field]}), {})
  return Yup.object(selections)
}
