import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import FormControl from 'components/forms/form_control'

export const DrawerContext = React.createContext({});

export default function TemporaryDrawer(props) {
  const [state, setState] = React.useState({
    show: false,
  });

  const hideDrawer = () => {
    setState({ show: false })
  }

  const contextValue = { hideDrawer }

  return (
    <div>
      <React.Fragment>
        <DrawerContext.Provider value={contextValue}>

          <div onClick={ () => setState({ show: true }) }>
            {props.children}
          </div>

          <Drawer anchor={'bottom'} open={state.show} onClose={ hideDrawer }>
            <FormControl {...props}/>
          </Drawer>

        </DrawerContext.Provider>
      </React.Fragment>
    </div>
  );
}
