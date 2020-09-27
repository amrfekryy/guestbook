import React from 'react';
import * as controls from 'components/forms/settings'
import { client } from 'index'
import { message } from 'antd'
import { useMutation } from '@apollo/client'
import { useNavigate } from "@reach/router"
import { UserContext } from 'containers/user_context'

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';




export default function DeleteAction(props){
  // confirmation dialog state
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const settings = controls[props.settings]

  const { userId } = React.useContext(UserContext);
  const navigate = useNavigate()

  const complete = {
    deleteGuestbook: () => {
      client.resetStore()
      navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    deleteMessage: () => {
      client.resetStore()
      // navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    deleteReply: () => {
      client.resetStore()
      // navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
  }

  const [triggerMutation, { data, loading, error }] = useMutation(settings.mutation, {
    onCompleted(data) {
      if (data[settings.name] && data[settings.name].success) 
        complete[settings.name](data)
      else message.error(data[settings.name].resMessage, 2);
      // alert(JSON.stringify(data, null, 2));
    }
  });
  // if (loading) // do something
  if (error) return message.error(error.message, 2);

  return <>
    <div onClick={ () => setShowConfirmation(true)}>
      {props.children}
    </div>
    <Dialog
      open={showConfirmation}
      onClose={() => setShowConfirmation(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
      <DialogActions>
        <Button onClick={() => setShowConfirmation(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={ () => triggerMutation({ variables: { id: props.id }}) } color="primary" autoFocus>
          Proceed
        </Button>
      </DialogActions>
    </Dialog>
  </>

}

