import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import createSchema from './validationSchema'
import { useMutation } from "@apollo/client";
import { ADDGUESTBOOK } from 'helpers/queries'

import { message } from 'antd';
import { useNavigate } from "@reach/router"
import { UserContext } from 'containers/user_context'

const FormControl =  (props) => {

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} sm={6} style={{padding: '50px'}}>
        <Paper elevation={3}>
          <Formik
            initialValues={{ title: '', description: '' }}
            // validationSchema={createSchema(props.formType)}
            onSubmit={values => 
              // alert(JSON.stringify(values))
              props.triggerMutation({ variables: { ...values }})
            }
          >
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
              >

                <Grid item xs={12}>
                  <Field name="title">
                    {({ field, meta }) => {
                      const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                      return <TextField type="text" label="Title" variant="outlined" required {...field} {...error} />;
                    }}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="description">
                    {({ field, meta }) => {
                      const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                      return <TextField type="text" label="Description" variant="outlined" required {...field} {...error} 
                          multiline style={{minWidth: '50ch'}}
                        />;
                    }}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                    <Button type='submit' variant="contained">{props.formType === 'signup' ? 'Sign Up' : 'Login'}</Button>
                </Grid>

              </Grid>
            </Form>
          </Formik>
        </Paper>
      </Grid>
      {/* <Backdrop  open={props.loading} >
        <CircularProgress color="inherit" />
      </Backdrop> */}
    </Grid>
  )
}


export default (props) => {
  const { formType } = props
  const navigate = useNavigate()
  const { loginUser } = React.useContext(UserContext);

  const settings = {
    addGuestbook: {
      text: 'Add',
      mutation: ADDGUESTBOOK,
      onSuccess: (data) => {
        // const { token, userId, userName } = data[formType]
        // loginUser({ token, userId, userName })
        navigate(`/login`)
      }
    },
    // signup: {
    //   text: 'Sign Up',
    //   mutation: SIGNUP,
    //   onSuccess: () => navigate('/login')
    // }
  }

  const [triggerMutation, { data, loading, error }] = useMutation(settings[formType].mutation, {
    // variables: { name, email, password },
    onCompleted(data) {
      alert(JSON.stringify(data))
      // redirect to login if signup was successful
      if (data[formType] && data[formType].success) {
        message.success(`Successful ${settings[formType].text}, Please wait...`, 3, 
          () => settings[formType].onSuccess(data))
      }
      else message.error(data[props.formType].resMessage, 3);
      // alert(JSON.stringify(data, null, 2));
    }
  });
  // if (loading) hide = message.loading('Action in progress..', 0);
  if (error) return message.error(error.message, 3);
  return <FormControl {...{...props, ...{ triggerMutation, data }}} />
}
