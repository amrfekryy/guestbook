import { ADDMESSAGE, } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const addReply = {
  entry: true,
  name: 'addReply',
  text: 'Add Reply',
  mutation: '',
  success_message: 'Reply was added',
  validationSchema: createSchema(['body']),
  fields: {
    userId: {skip: true},
    messageId: {skip: true},
    body: {
      type: "text", 
      label: "Message", 
      required: true,
      multiline: true,
    },
  }
}

export const updateReply = {
  entry: true,
  name: 'updateReply',
  text: 'Update Reply',
  mutation: ADDMESSAGE,
  success_message: 'Reply was updated',
  validationSchema: createSchema(['body']),
  fields: {
    body: {
      type: "text", 
      label: "Message", 
      required: true,
      multiline: true,
    },
  }
}
