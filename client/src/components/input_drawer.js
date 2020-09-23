import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import EntryForm from 'components/forms/entry'

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
          <EntryForm formType='addGuestbook'/>
        </Drawer>
      </React.Fragment>
    </div>
  );
}
