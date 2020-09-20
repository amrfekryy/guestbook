import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Comment from './comment'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    // maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <Comment commentType={props.commentType}/>
      <Comment commentType={props.commentType}/>
      <Comment commentType={props.commentType}/>

    </List>
  );
}
