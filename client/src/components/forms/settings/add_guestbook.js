import { ADDGUESTBOOK, UPDATEGUESTBOOK } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const addGuestbook = {
  entry: true,
  name: 'addGuestbook',
  text: 'Add Guest Book',
  mutation: ADDGUESTBOOK,
  success_message: 'Guest Book was added',
  validationSchema: createSchema(['title', 'description']),
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


export const updateGuestbook = {
  entry: true,
  name: 'updateGuestbook',
  text: 'Update Guest Book',
  mutation: UPDATEGUESTBOOK,
  success_message: 'Guest Book was updated',
  validationSchema: createSchema(['title', 'description']),
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
