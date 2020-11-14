import React from 'react';

import useSpotifyStore from '@store/spotify';

const Home = () => {
  const accessToken = useSpotifyStore((state) => state.accessToken);
  const getProfileData = useSpotifyStore((state) => state.getProfileData);
  const logout = useSpotifyStore((state) => state.logout);

  const handleGetProfileData = () => {
    getProfileData().then(console.log);
  };

  return (
    <>
      <h1 css={{ color: 'blue' }}>Release Recommender</h1>
      {accessToken ? (
        <>
          <button onClick={handleGetProfileData}>Log profile data</button>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <a href="/api/spotify_login">Login</a>
      )}
    </>
  );
};

export default Home;
