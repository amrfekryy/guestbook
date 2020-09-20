
// export default () => <><Card /><Card /><Card /><Card /><Card /></>


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from 'components/guestbook_card'

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid           
        container
        direction="row"
        justify="center"
        spacing={3}
      >
        <Grid item xs={12} sm={6} lg={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card />
        </Grid>
      </Grid>
    </div>
  );
}
