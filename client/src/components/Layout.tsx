import { Outlet, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import {
  Brightness2 as MoonIcon,
  QueueMusic as QueueIcon,
  WbSunny as SunIcon,
} from '@material-ui/icons';

import useStore from '@store';
import { useColorScheme } from '@utils/ThemeProvider';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
  },
  toolbar: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    marginRight: 'auto',
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
  const navigate = useNavigate();
  const logout = useStore((state) => state.logout);
  const { isDarkMode, toggleColorScheme } = useColorScheme();
  const numTracksInQueue = useStore((state) => state.queue.length);

  const handleLogout = () => {
    navigate('/');
    logout();
  };

  return (
    <div className={styles.container}>
      <AppBar position="sticky">
        <Toolbar className={styles.toolbar}>
          <Link className={styles.title} component={RouterLink} to="/">
            <Typography variant="h5">release recommender</Typography>
          </Link>
          <Link
            className={styles.queue}
            component={RouterLink}
            to="/queue"
            underline="none"
          >
            <Button color="inherit">
              <QueueIcon className={styles.queueIcon} />
              {numTracksInQueue} track{numTracksInQueue !== 1 && 's'}
            </Button>
          </Link>
          <Button
            className={styles.logoutButton}
            color="inherit"
            onClick={handleLogout}
          >
            log out
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
