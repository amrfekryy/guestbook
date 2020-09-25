import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Comment from './comment'
import Divider from '@material-ui/core/Divider';

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
        {props.comments.map((comment, index)=> 
          <div style={{marginLeft: props.commentsType === 'replies' ? '6ch' : ''}}>
            <Comment {...{ comment, commentsType: props.commentsType }}/>
            {(index !== props.comments.length - 1) && <Divider variant="inset" component="li" />}
          </div>
        )}
    </List>
  );
}
