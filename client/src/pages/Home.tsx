/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment } from 'react';
import { useQuery } from 'react-query';

import useSpotifyStore from '../store/spotify';

const Home = () => {
  const logout = useSpotifyStore((state) => state.logout);
  const { data: profileData } = useQuery('/me');
  const { data: playlistData } = useQuery('/me/playlists');

  return (
    <Fragment>
      <h1 css={{ color: 'blue' }}>Release Recommender</h1>
      <button onClick={logout}>Logout</button>
      <br />
      {profileData && (
        <div>
          <h2>Profile:</h2>
          <pre>{JSON.stringify(profileData, null, 2)}</pre>
        </div>
      )}
      {playlistData && (
        <div>
          <h2>Playlists:</h2>
          <pre>{JSON.stringify(playlistData, null, 2)}</pre>
        </div>
      )}
    </Fragment>
  );
};

export default Home;
