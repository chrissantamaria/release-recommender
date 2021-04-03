import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';

import Routes from './Routes';
import ThemeProvider from '@utils/ThemeProvider';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  // Used to warm up serverless API since a Spotify auth request
  // will likely come soon after app entry
  useEffect(() => {
    fetch('/api/healthcheck');
  });

  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeProvider>
    </ReactQueryCacheProvider>
  );
};

export default App;
