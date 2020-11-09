import React, { useEffect, useState } from 'react';
import Head from 'next/head';

const Home = () => {
  const [message, setMessage] = useState<null | string>(null);

  useEffect(() => {
    fetch('/api/hello')
      .then((res) => res.text())
      .then(setMessage);
  }, []);

  return (
    <>
      <Head>
        <title>Release Recommender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 css={{ color: 'blue' }}>Release Recommender</h1>
      {!message ? <p>Loading...</p> : <p>API response: {message}</p>}
    </>
  );
};

export default Home;
