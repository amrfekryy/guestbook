import React from 'react';
import { Link } from '@reach/router';

import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';

import HomeIcon from '@material-ui/icons/Home';
import VpnKey from '@material-ui/icons/VpnKey';
import LockOpen from '@material-ui/icons/LockOpen';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';

import AddGuestbookDrawer from 'components/input_drawer'
import { UserContext } from 'containers/user_context'

export const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(4),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300],
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12),
    },
  },
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591


export default function CustomizedBreadcrumbs() {
  const { isLoggedIn, logoutUser } = React.useContext(UserContext);

  // const { data } = useQuery(IS_LOGGED_IN);
  console.log('dddddddddddd', isLoggedIn, logoutUser)

  return (
    <Breadcrumbs aria-label="breadcrumb" style={{
      margin: '5ch',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing= {3}
    >
        <Grid item>
          <StyledBreadcrumb component={Link} to='/' label="Home"
            icon={<HomeIcon fontSize="small" />}
          />
        </Grid>

        { !isLoggedIn && <>
          <Grid item>
            <StyledBreadcrumb component={Link} to='login' label="Login"
              icon={<LockOpen fontSize="small" />}
            />
          </Grid>
          <Grid item>
            <StyledBreadcrumb component={Link} to='signup' label="Sign Up"
              icon={<VpnKey fontSize="small" />}
            />
          </Grid>
        </>}

        { isLoggedIn && <>
          <Grid item>
            <StyledBreadcrumb component={Link} to={`profile/${1}`} label="Me"
              icon={<Person fontSize="small" />}
            />
          </Grid>
          <Grid item>
            <AddGuestbookDrawer />
          </Grid>
          <Grid item>
            <StyledBreadcrumb component={Link} to='login' label="Logout"
              icon={<ExitToApp fontSize="small"/>} onClick={logoutUser}
            />
          </Grid>
        </>}
    </Grid>
    </Breadcrumbs>
  );
}
