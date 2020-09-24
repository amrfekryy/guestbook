import { ADDGUESTBOOK } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const addGuestbook = {
  entry: true,
  name: 'addGuestbook',
  text: 'Add Guest Book',
  mutation: ADDGUESTBOOK,
  success_message: 'Guest Book was added',
  validationSchema: createSchema('addGuestbook'),
  fields: {
    title: {
      type: "text", 
      label: "Title", 
      required: true
    },
    description: {
      type: "text", 
      label: "Description", 
      required: true,
      multiline: true,
      // style: {minWidth: '50ch'}
    },
  }
}
