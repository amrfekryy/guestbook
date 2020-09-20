import React from 'react';
import { Link } from '@reach/router';

import { emphasize, withStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import HomeIcon from '@material-ui/icons/Home';
import VpnKey from '@material-ui/icons/VpnKey';
import LockOpen from '@material-ui/icons/LockOpen';

const StyledBreadcrumb = withStyles((theme) => ({
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

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function CustomizedBreadcrumbs() {
  return (
    <Breadcrumbs aria-label="breadcrumb" style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
        <StyledBreadcrumb component={Link} to='/' label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        <StyledBreadcrumb component={Link} to='login' label="Login"
          icon={<LockOpen fontSize="small" />}
        />
        <StyledBreadcrumb component={Link} to='signup' label="Sign Up"
          icon={<VpnKey fontSize="small" />}
        />
    </Breadcrumbs>
  );
}
