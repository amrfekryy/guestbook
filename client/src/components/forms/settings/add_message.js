import { ADDMESSAGE, } from 'helpers/queries'
import { createSchema } from '../validationSchema'

export const addMessage = {
  entry: true,
  name: 'addMessage',
  text: 'Add Message',
  mutation: ADDMESSAGE,
  success_message: 'Message was added',
  validationSchema: createSchema(['body']),
  fields: {
    userId: {skip: true},
    guestbookId: {skip: true},
    body: {
      type: "text", 
      label: "Message", 
      required: true,
      multiline: true,
    },
  }
}

export const updateMessage = {
  entry: true,
  name: 'updateMessage',
  text: 'Add Message',
  mutation: ADDMESSAGE,
  success_message: 'Message was updated',
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


export const addGuestMessage = {
  entry: true,
  name: 'addMessage',
  text: 'Add Message',
  mutation: ADDMESSAGE,
  success_message: 'Message was added',
  validationSchema: createSchema(['body']),
  fields: {
    guestbookId: {skip: true},
    guestName: {
      type: "text", 
      label: "Name", 
      required: true,
    },
    guestEmail: {
      type: "email", 
      label: "Email",
      placeholder: "Optional" 
    },
    body: {
      type: "text", 
      label: "Message", 
      required: true,
      multiline: true,
    },
  }
}

