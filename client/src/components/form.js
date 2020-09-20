import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div>
        <TextField id="name" label="Name" variant="outlined"/> <br/>
        <TextField id="email" label="Email" variant="outlined"/> <br/>
        <TextField id="password" label="Password" type="password" variant="outlined"/> <br/>
        <TextField id="password2" label="Retype Password" type="password" variant="outlined"/>
      </div>
    </form>
  );
}
