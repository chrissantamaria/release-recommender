import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';

import Routes from './Routes';
import ThemeProvider from './utils/ThemeProvider';

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <ThemeProvider>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  </ReactQueryCacheProvider>
);

export default App;
