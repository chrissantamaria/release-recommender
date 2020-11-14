import React from 'react';
import { useQuery } from 'react-query';
import { Button, Typography } from '@material-ui/core';

import useStore from '../store';

const Home = () => {
  const logout = useStore((state) => state.logout);
  const { data: profileData } = useQuery('/me');
  const { data: playlistData } = useQuery('/me/playlists');

  return (
    <>
      <Typography variant="h3">Release Recommender</Typography>
      <Button
        variant="contained"
        color="primary"
        disableElevation
        style={{ marginBottom: '1rem' }}
        onClick={logout}
      >
        Logout
      </Button>
      {profileData && (
        <div>
          <Typography variant="h4">Profile:</Typography>
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      )}
      {playlistData && (
        <div>
          <Typography variant="h4">Playlists:</Typography>
          <pre>{JSON.stringify(playlistData, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default Home;
