import React from 'react';
import Head from 'next/head';

import useSpotifyStore from '../store/spotify';

const Home = () => {
  const accessToken = useSpotifyStore((state) => state.accessToken);

  return (
    <>
      <Head>
        <title>Release Recommender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 css={{ color: 'blue' }}>Release Recommender</h1>
      {accessToken ? (
        <p>Access token: {accessToken}</p>
      ) : (
        <a href="/api/spotify_login">Login</a>
      )}
    </>
  );
};

export default Home;
