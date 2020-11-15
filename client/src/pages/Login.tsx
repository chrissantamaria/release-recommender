import React from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  },
});

const Login = () => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <Grid container justify="center">
        <Grid
          item
          sm={12}
          md={4}
          style={{
            marginBottom: '2rem',
          }}
        >
          <Typography variant="h4">
            in a music rut? use machine learning to shake up your wfh playlists
          </Typography>
        </Grid>
        <Grid
          item
          sm={12}
          md={4}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '2rem',
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = '/api/spotify_login';
            }}
          >
            <Typography variant="h5">sign in with spotify</Typography>
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
