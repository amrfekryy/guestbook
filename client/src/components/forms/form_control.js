import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useMutation } from "@apollo/client";

import { message } from 'antd';
import { useNavigate } from "@reach/router"
import { UserContext } from 'containers/user_context'
import * as controls from 'components/forms/settings'
import { DrawerContext } from 'components/input_drawer'
import { client } from 'index'

// export default class SignupForm extends React.Component {
// MyInput = ({ field, form, ...props }) => {
//   return <TextField {...field} {...props} label="Name" variant="outlined" />;
// };

const FormControl = (props) => {
  const { settings, triggerMutation, currentValues={} } = props

  return (
    <Grid
      container
      direction="row"
      justify="center"
    // alignItems="center"
    >
      <Grid item xs={12} sm={6} lg={4} style={settings.entry ? {padding: '50px'} : {}}>
        <Paper elevation={3} >
          <Formik
            // set initialValues to empty strings 
            initialValues={Object.keys(settings.fields).reduce((obj, key) => ({...obj, [key]: currentValues[key] || ''}) , {})}
            validationSchema={settings.validationSchema || ''}
            onSubmit={values => triggerMutation({ variables: { ...values , id: currentValues.id }})}
          >
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                {Object.keys(settings.fields).map(fieldName => {
                  if (settings.fields[fieldName].skip)
                    return <></>
                  const fieldProps = settings.fields[fieldName]
                  return <Grid item xs={12}>
                  <Field name={fieldName}>
                    {({ field, meta }) => {
                      const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                      return <TextField variant="outlined" {...field} {...error} {...fieldProps} 
                      inputProps={{defaultValue: currentValues[fieldName] || ''}}/>;
                    }}
                  </Field>
                </Grid>
                })}
                
                <Grid item xs={12}>
                    <Button type='submit' variant="contained">{settings.text}</Button>
                </Grid>

              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
    </Grid>
  )
}


export default (props) => {
  const settings = controls[props.settings]

  const { loginUser, userId } = React.useContext(UserContext);
  const { hideDrawer } = React.useContext(DrawerContext);
  const navigate = useNavigate()

  const complete = {
    login: (data) => {
      alert(JSON.stringify(data, null, 2));

      const { token, me: { id, name, guestbooks, messages, replies } } = data[settings.name]
      loginUser({ token, userId: id, userName: name, guestbooks, messages, replies })
      message.success(settings.success_message, 2, navigate(`/profile/${id}`))
    },
    signup: () => {
      message.success(settings.success_message, 2, navigate('/login'))
    },
    addGuestbook: () => {
      hideDrawer()
      client.resetStore()
      navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    updateGuestbook: () => {
      hideDrawer()
      client.resetStore()
      // navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    addMessage: () => {
      hideDrawer()
      client.resetStore()
      // navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    updateMessage: () => {
      hideDrawer()
      client.resetStore()
      // navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    addReply: () => {
      hideDrawer()
      client.resetStore()
      // navigate(`/profile/${userId}`)
      message.success(settings.success_message, 2)
    },
    updateReply: () => {
      hideDrawer()
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
  return <FormControl {...{ settings, triggerMutation, data, currentValues: props.currentValues }} />
}
