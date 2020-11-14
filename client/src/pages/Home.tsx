import React from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@material-ui/core';

const Home = () => {
  const { data: profileData } = useQuery('/me');
  const { data: playlistData } = useQuery('/me/playlists');

  return (
    <>
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
