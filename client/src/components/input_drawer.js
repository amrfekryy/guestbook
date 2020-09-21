import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import {StyledBreadcrumb} from 'components/header'
import AddCircle from '@material-ui/icons/AddCircle';
import { Link } from '@reach/router';


const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
});

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    show: false,
  });

  return (
    <div>
      <React.Fragment>
        <StyledBreadcrumb label="Add Guestbook"
            component={Link} to={`/profile/${1}`}
            icon={<AddCircle fontSize="small" />}
            onClick={()=>setState({ show: true })}
          />

        {/* <Button onClick={()=>setState({ show: true })} >fdsf</Button> */}
        <Drawer anchor={'bottom'} open={state['show']} onClose={()=>setState({ show: false })}>
          <div>Hello</div>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
