import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentList from './commentList'

const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  // alert(JSON.stringify(props))

  const authorName = props.comment.user ? props.comment.user.name : props.comment.guest.name

  return (
    <>
      <ListItem alignItems="flex-start">
        
        <ListItemAvatar>
          <Avatar alt={authorName} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        
        <ListItemText
          primary={authorName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {props.comment.body}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>

      {props.commentsType === 'messages' && props.comment.replies.length > 0 &&
        <CommentList commentsType='replies' comments={props.comment.replies}/>}
    </>
  );
}
