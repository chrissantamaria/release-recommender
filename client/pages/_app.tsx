import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Global } from '@emotion/core';
import normalize from 'emotion-normalize';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Release Recommender</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Global styles={normalize} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
