import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Image from 'assets/guestbook.jpg'
import { Link } from '@reach/router';

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

  return (
    <Card className={classes.root}>
      <CardContent>
        <CardMedia
          className={classes.media}
          image={Image}
          title="Contemplative Reptile"
        />
        <Typography variant="h5" component="h2">
          GuestBook Title
        </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Date
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          By: Author
        </Typography>
        <Typography variant="body2" component="p">
          Description
        </Typography>
      </CardContent>
      <CardActions>
        <Grid   
          container
          direction="row"
          justify="center"
          // alignItems="center"
        >
          <Button size="small" color="primary" 
            component={Link} to={`/guestbook/${props.guestbookId}`}>Visit</Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
