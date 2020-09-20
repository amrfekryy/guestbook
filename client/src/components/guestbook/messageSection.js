import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CommentList from './commentList'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          Messages
        </Typography>
        <CommentList commentType='message'/>
      </CardContent>
    </Card>
  );
}
