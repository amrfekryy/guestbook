import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import FormControl from 'components/forms/form_control'

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    show: false,
  });

  return (
    <div>
      <React.Fragment>
        <div onClick={()=>setState({ show: true })}>
          {props.children}
        </div>
        <Drawer anchor={'bottom'} open={state['show']} onClose={()=>setState({ show: false })}>
          <FormControl settings='addGuestbook'/>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
