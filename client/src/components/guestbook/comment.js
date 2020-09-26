import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CommentList from './commentList'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ConnectDrawer from 'components/input_drawer'
import DeleteAction from 'components/delete_action'
import { UserContext } from 'containers/user_context'

const CommentActions = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const { comment, commentType } = props
  const { userId, isLoggedIn } = React.useContext(UserContext);
  const belongsToUser = comment.userId === userId
  const isMessage = commentType === 'Message'
  const isReply = commentType === 'Reply'

  return (isMessage && isLoggedIn) || (isReply && belongsToUser) ?
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      ><MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
      >
        {isMessage && 
        <ConnectDrawer settings='addReply' currentValues={{messageId: comment.id, userId}}>
          <MenuItem onClick={handleClose}>reply</MenuItem>
        </ConnectDrawer>}
        
        {belongsToUser &&
        <ConnectDrawer settings={`update${commentType}`} currentValues={comment}>
          <MenuItem onClick={handleClose}>update</MenuItem>
        </ConnectDrawer>}

        {belongsToUser &&
        <DeleteAction settings={`delete${commentType}`} id={comment.id}>
          <MenuItem onClick={handleClose}>delete</MenuItem>
        </DeleteAction>}

      </Menu>
    </div>
  : <div></div>
}


const useStyles = makeStyles((theme) => ({
  inline: {
    display: 'inline',
  },
}));

export default function Comment(props) {
  const classes = useStyles();
  
  const { comment: { body, user, guest, replies=[] }, commentType } = props

  const authorName = user ? user.name : guest.name

  const isMessage = commentType === 'Message'
  const hasReplies = replies.length > 0

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
                {body}
              </Typography>
            </React.Fragment>
          }
        />      
        <CommentActions {...props}/>
      </ListItem>

      {isMessage && hasReplies && <CommentList commentType='Reply' comments={replies}/>}
    </>
  );
}

