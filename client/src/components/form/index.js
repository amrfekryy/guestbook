import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import createSchema from './validationSchema'
import { useMutation } from "@apollo/client";
import { SIGNUP, LOGIN } from 'helpers/queries'

import { message } from 'antd';
import { useNavigate } from "@reach/router"
// import { loginUser } from 'helpers/user_session'
import { UserContext } from 'containers/user_context'

// export default class SignupForm extends React.Component {
// MyInput = ({ field, form, ...props }) => {
//   return <TextField {...field} {...props} label="Name" variant="outlined" />;
// };

const SignupForm = (props) => {

  return (
    <Grid
      container
      direction="row"
      justify="center"
    // alignItems="center"
    >
      <Grid item xs={12} sm={6} lg={4}>
        <Paper elevation={3} >
          <Formik
            initialValues={{ name: '', email: '', password: '', password2: '' }}
            validationSchema={createSchema(props.formType)}
            onSubmit={values => props.triggerMutation({ variables: { ...values }})}
          >
            <Form>
              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
              >
                {props.formType === 'signup' &&
                  <Grid item xs={12}>
                    <Field name="name">
                      {({ field, meta }) => {
                        const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                        return <TextField type="text" label="Name" variant="outlined" required {...field} {...error} />;
                      }}
                    </Field>
                  </Grid>}

                <Grid item xs={12}>
                  <Field name="email">
                    {({ field, meta }) => {
                      const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                      return <TextField type="email" label="Email" variant="outlined" required {...field} {...error} />;
                    }}
                  </Field>
                </Grid>

                <Grid item xs={12}>
                  <Field name="password">
                    {({ field, meta }) => {
                      const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                      return <TextField type="password" label="Password" variant="outlined" required {...field} {...error} />;
                    }}
                  </Field>
                </Grid>

                {props.formType === 'signup' &&
                  <Grid item xs={12}>
                    <Field name="password2">
                      {({ field, meta }) => {
                        const error = meta.touched && meta.error ? { error: true, helperText: meta.error } : null
                        return <TextField type="password" label="Confirm Password" variant="outlined" required {...field} {...error} />;
                      }}
                    </Field>
                  </Grid>}

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
    login: {
      text: 'Login',
      mutation: LOGIN,
      onSuccess: (data) => {
        const { token, userId, userName } = data[formType]
        loginUser({ token, userId, userName })
        navigate(`/profile/${userId}`)
      }
    },
    signup: {
      text: 'Sign Up',
      mutation: SIGNUP,
      onSuccess: () => navigate('/login')
    }
  }

  const [triggerMutation, { data, loading, error }] = useMutation(settings[formType].mutation, {
    // variables: { name, email, password },
    onCompleted(data) {
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
  return <SignupForm {...{...props, ...{ triggerMutation, data }}} />
}
