import React from 'react';
import { Outlet } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Grid, Toolbar } from '@material-ui/core';
import {
  WbSunny as SunIcon,
  Brightness2 as MoonIcon,
  QueueMusic as QueueIcon,
} from '@material-ui/icons';

import useStore from '../store';
import { useColorScheme } from '../utils/ThemeProvider';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  toolbar: {
    justifyContent: 'flex-end',
  },
  logoutButton: {
    marginRight: '1rem',
  },
  sunIcon: {
    color: 'white',
  },
  contentContainer: {
    overflowY: 'scroll',
  },
  queue: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  queueIcon: {
    marginRight: '0.5rem',
  },
});

const Layout = () => {
  const styles = useStyles();
  const logout = useStore((state) => state.logout);
  const { isDarkMode, toggleColorScheme } = useColorScheme();
  const numTracksInQueue = useStore((state) => state.queue.length);

  return (
    <div className={styles.container}>
      <AppBar position="sticky">
        <Toolbar className={styles.toolbar}>
          <Button className={styles.queue} color="inherit">
            <QueueIcon className={styles.queueIcon} />
            {numTracksInQueue} track{numTracksInQueue !== 1 && 's'}
          </Button>
          <Button
            className={styles.logoutButton}
            color="inherit"
            onClick={logout}
          >
            Log Out
          </Button>
          <IconButton onClick={toggleColorScheme}>
            {isDarkMode ? <MoonIcon /> : <SunIcon className={styles.sunIcon} />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Grid className={styles.contentContainer} container justify="center">
        <Grid item sm={12} md={10} lg={9} xl={8}>
          <Outlet />
        </Grid>
      </Grid>
    </div>
  );
};

export default Layout;
