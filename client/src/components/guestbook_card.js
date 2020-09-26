import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Image from 'assets/guestbook.jpg'
import { Link } from '@reach/router';
import { UserContext } from 'containers/user_context'
import ConnectDrawer from 'components/input_drawer'
import DeleteAction from 'components/delete_action'

const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  media: {
    minHeight: 200,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  const { userId, isLoggedIn } = React.useContext(UserContext);

  const belongsToUser = props.guestbook.userId === userId
  const isGuestbookPage = props.display === 'main'

  const { guestbook: { id: guestbookId, title, description, user, createdAt } } = props  
  const timestamp = new Date(+createdAt)
  // alert(JSON.stringify(+createdAt))
  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Guest Book Picture"
        />
        <Typography variant="h5" component="h2">{ title }</Typography>

        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Created by {user.name} on {timestamp.toLocaleString()}
        </Typography>

        <Typography variant="body2" component="p">{ description }</Typography>
      </CardContent>

      <CardActions>
        <Grid   
          container
          direction="row"
          justify="center"
          // alignItems="center"
        >
          {isGuestbookPage && !isLoggedIn && 
            <ConnectDrawer settings='addGuestMessage' currentValues={{ guestbookId, guestName: 'Anonymous' }}>
              <Button size="small" color="primary">Add Message</Button>
            </ConnectDrawer>}

          {isGuestbookPage && isLoggedIn &&
            <ConnectDrawer settings='addMessage' currentValues={{ userId, guestbookId }}>
              <Button size="small" color="primary">Add Message</Button>
            </ConnectDrawer>}

          {!isGuestbookPage &&
            <Button size="small" color="primary" 
              component={Link} to={`/guestbook/${guestbookId}`}>Read</Button>}

          {belongsToUser && 
            <ConnectDrawer settings='updateGuestbook' currentValues={props.guestbook}>
              <Button size="small" color="primary">Update</Button>
            </ConnectDrawer>}

          {belongsToUser && 
            <DeleteAction settings="deleteGuestbook" id={guestbookId}>
              <Button size="small" color="secondary">Delete</Button>
            </DeleteAction>}
        
        </Grid>
      </CardActions>
    </Card>
  );
}
