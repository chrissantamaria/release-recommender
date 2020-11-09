import React from 'react';
import { AppProps } from 'next/app';
import { Global } from '@emotion/core';
import normalize from 'emotion-normalize';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Global styles={normalize} />
      <Component {...pageProps} />
    </>
  );
};

export default App;
