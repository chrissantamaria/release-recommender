import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import usePlaylists from '@utils/usePlaylists';
import PlaylistPreview from './PlaylistPreview';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  header: {
    margin: '1rem 0',
  },
  grid: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  preview: {
    margin: '1rem',
  },
});

const Home = () => {
  const styles = useStyles();
  const { data: playlists } = usePlaylists();

  return (
    <div>
      <div className={styles.header}>
        <Typography variant="h4" gutterBottom>
          queue up!
        </Typography>
        <Typography variant="h6">
          choose as many of your playlists as you&apos;d like.
        </Typography>
        <Typography variant="h6">more songs = more recommendations</Typography>
      </div>
      {playlists && (
        <div className={styles.grid}>
          {playlists.map((playlist) => (
            <PlaylistPreview
              key={playlist.id}
              className={styles.preview}
              {...playlist}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
