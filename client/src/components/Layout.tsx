import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Toolbar } from '@material-ui/core';

import useStore from '../store';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'flex-end',
  },
});

const Layout = () => {
  const styles = useStyles();
  const logout = useStore((state) => state.logout);

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <Button color="inherit" onClick={logout}>
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Layout;
