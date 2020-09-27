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

  const { isLoggedIn } = React.useContext(UserContext);

  let message = "No guestbooks yet!"
  message = isLoggedIn 
    ? `${message} Add your first guestbook.` 
    : `${message} Login and add your first guestbook.`

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Guest Book Picture"
        />
        {/* <Typography variant="h5" component="h4">{ message }</Typography> */}
        <Typography variant="body2" component="p">{ message }</Typography>
      </CardContent>

      {/* <CardActions>
        <Grid   
          container
          direction="row"
          justify="center"
          // alignItems="center"
        >
          {isLoggedIn && 
            <ConnectDrawer settings='addGuestMessage' currentValues={{ guestbookId, guestName: 'Anonymous' }}>
              <Button size="small" color="primary">Add Message</Button>
            </ConnectDrawer>}

        </Grid>
      </CardActions> */}
    </Card>
  );
}
