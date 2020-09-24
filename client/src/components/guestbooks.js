import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from 'components/guestbook_card'
import Grid from '@material-ui/core/Grid';
import { UserContext } from 'containers/user_context'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
// }));

export default function FullWidthGrid() {
  // const classes = useStyles();

  const { guestbooks = [] } = React.useContext(UserContext);

  return (
    <div 
      // className={classes.root}
    >
      <Grid           
        container
        direction="row"
        justify="center"
        spacing={3}
      >
        {guestbooks.map(guestbook => 
          <Grid item xs={12} sm={6} lg={4}>
            <Card {...{ guestbook }}/>
          </Grid>
        )}
        {/* <Grid item xs={12} sm={6} lg={4}>
          <Card guestbookId={1}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card guestbookId={1}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card guestbookId={1}/>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <Card guestbookId={1}/>
        </Grid> */}
      </Grid>
    </div>
  );
}
