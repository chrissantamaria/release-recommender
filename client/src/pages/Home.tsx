import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import usePlaylists from '../utils/usePlaylists';
import PlaylistPreview from '../components/PlaylistPreview';

const useStyles = makeStyles({
  container: {
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
  if (!playlists) return null;

  return (
    <div className={styles.container}>
      {playlists.map((playlist) => (
        <PlaylistPreview
          key={playlist.id}
          className={styles.preview}
          {...playlist}
        />
      ))}
    </div>
  );
};

export default Home;
