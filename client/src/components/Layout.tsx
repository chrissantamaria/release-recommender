import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Toolbar } from '@material-ui/core';
import {
  WbSunny as SunIcon,
  Brightness2 as MoonIcon,
} from '@material-ui/icons';

import useStore from '../store';
import { useColorScheme } from '../utils/ThemeProvider';

const useStyles = makeStyles({
  toolbar: {
    justifyContent: 'flex-end',
  },
  colorSchemeButton: {
    marginRight: '0.5rem',
  },
  sunIcon: {
    color: 'white',
  },
});

const Layout = () => {
  const styles = useStyles();
  const logout = useStore((state) => state.logout);
  const { isDarkMode, toggleColorScheme } = useColorScheme();

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={styles.toolbar}>
          <IconButton
            className={styles.colorSchemeButton}
            onClick={toggleColorScheme}
          >
            {isDarkMode ? <MoonIcon /> : <SunIcon className={styles.sunIcon} />}
          </IconButton>
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
