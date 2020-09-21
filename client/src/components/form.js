import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// const MyInput = ({ field, form, ...props }) => {
//   return <TextField {...field} {...props} label="Name" variant="outlined" />;
// };

const SignupForm = () => {
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
        validationSchema={Yup.object({
          name: Yup.string().required('Required'),
          email: Yup.string().email('Invalid email address').required('Required'),
          password: Yup.string().required('Required'),
          password2: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
              <Field name="name">
                  {({ field, meta }) => {
                    const error = meta.touched && meta.error ? {error: true, helperText: meta.error} : null
                    return <TextField type="text" label="Name" variant="outlined" required {...field} {...error}/>;
                }}
              </Field>
            
            </Grid>

            <Grid item xs={12}>
              <Field name="email">
                {({ field, meta }) => {
                    const error = meta.touched && meta.error ? {error: true, helperText: meta.error} : null
                    return <TextField type="email" label="Email" variant="outlined" required {...field} {...error}/>;
                }}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="password">              
                {({ field, meta }) => {
                    const error = meta.touched && meta.error ? {error: true, helperText: meta.error} : null
                    return <TextField type="password" label="Password" variant="outlined" required {...field} {...error}/>;
                }}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Field name="password2">
              {({ field, meta }) => {
                    const error = meta.touched && meta.error ? {error: true, helperText: meta.error} : null
                    return <TextField type="password" label="Confirm Password" variant="outlined" required {...field} {...error}/>;
                }}
              </Field>
            </Grid>

            <Grid item xs={12}>
              <Button type='submit' variant="contained">Submit</Button>
            </Grid>
          
          </Grid>
        </Form>
      </Formik>
    </Paper>
    </Grid>
    </Grid>
  );
};

export default SignupForm