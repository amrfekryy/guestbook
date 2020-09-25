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
import { message } from 'antd'
import { useMutation } from '@apollo/client'
import { DELETEGUESTBOOK } from 'helpers/queries'
import { client } from 'index'
import { useNavigate } from "@reach/router"

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

  const { userId } = React.useContext(UserContext);
  const navigate = useNavigate()

  const belongsToUser = props.guestbook.userId === userId
  const notGuestbookPage = props.display !== 'main'

  const [deleteGuestbook, { data, loading, error }] = useMutation(DELETEGUESTBOOK, {
    onCompleted(data) {
      if (data.deleteGuestbook && data.deleteGuestbook.success) {
        navigate(`/profile/${userId}`)
        client.resetStore()
        message.success('Guest book was deleted successfully', 2);
      } else message.error(data.deleteGuestbook.resMessage, 2);
    }
  });
  // if (loading) // do something
  if (error) return message.error(error.message, 2);


  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Guest Book Picture"
        />
        <Typography variant="h5" component="h2">
          {props.guestbook.title}
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Created by {props.guestbook.user.name} at {props.guestbook.createdAt}
        </Typography>
        {/* <Typography className={classes.pos} color="textSecondary">
          By Author
        </Typography> */}
        <Typography variant="body2" component="p">
          {props.guestbook.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid   
          container
          direction="row"
          justify="center"
          // alignItems="center"
        >
          {notGuestbookPage &&
            <Button size="small" color="primary" 
              component={Link} to={`/guestbook/${props.guestbook.id}`}>Open</Button>}
          {belongsToUser && 
            <Button size="small" color="primary">Update</Button>}
          {belongsToUser && 
            <Button size="small" color="secondary" 
              onClick={() => deleteGuestbook({ variables: { guestbookId: props.guestbook.id }})}>Delete</Button>}
        </Grid>
      </CardActions>
    </Card>
  );
}
