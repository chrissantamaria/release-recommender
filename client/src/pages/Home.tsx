/** @jsx jsx */
import { jsx } from '@emotion/react';
import { Fragment } from 'react';

import useSpotifyStore from '../store/spotify';

const Home = () => {
  const getProfileData = useSpotifyStore((state) => state.getProfileData);
  const logout = useSpotifyStore((state) => state.logout);

  const handleGetProfileData = () => {
    getProfileData().then(console.log);
  };

  return (
    <Fragment>
      <h1 css={{ color: 'blue' }}>Release Recommender</h1>
      <button onClick={handleGetProfileData}>Log profile data</button>
      <button onClick={logout}>Logout</button>
    </Fragment>
  );
};

export default Home;
