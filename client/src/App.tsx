import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryCacheProvider } from 'react-query';

import Routes from './Routes';
import queryCache from './utils/queryCache';
import ThemeProvider from './utils/ThemeProvider';

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
