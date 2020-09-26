import { ADDREPLY, UPDATEREPLY, DELETEREPLY } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const addReply = {
  entry: true,
  name: 'addReply',
  text: 'Add Reply',
  mutation: ADDREPLY,
  success_message: 'Reply was added',
  validationSchema: createSchema(['body']),
  fields: {
    userId: {skip: true},
    messageId: {skip: true},
    body: {
      type: "text", 
      label: "Reply", 
      required: true,
      multiline: true,
    },
  }
}

export const updateReply = {
  entry: true,
  name: 'updateReply',
  text: 'Update Reply',
  mutation: UPDATEREPLY,
  success_message: 'Reply was updated',
  validationSchema: createSchema(['body']),
  fields: {
    body: {
      type: "text", 
      label: "Reply", 
      required: true,
      multiline: true,
    },
  }
}

export const deleteReply = {
  name: 'deleteReply',
  text: 'Delete Reply',
  mutation: DELETEREPLY,
  success_message: 'Reply was deleted',
}
