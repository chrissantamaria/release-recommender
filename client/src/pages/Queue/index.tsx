import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';

import useStore from '../../store';

import Table from './Table';

const useStyles = makeStyles({
  noTracks: {
    marginTop: '2rem',
  },
  container: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1rem',
  },
});

const Queue = () => {
  const styles = useStyles();
  const queuedTracks = useStore((state) => state.queue);

  if (!queuedTracks.length) {
    return (
      <Typography className={styles.noTracks} variant="h5" align="center">
        You have no tracks in your queue! Go add some.
      </Typography>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Button variant="contained" color="primary">
          make it a playlist ;)
        </Button>
      </div>
      <Table tracks={queuedTracks} />
    </div>
  );
};

export default Queue;
