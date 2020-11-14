import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryCacheProvider } from 'react-query';

import Routes from './Routes';
import queryCache from './utils/queryCache';

const App = () => (
  <ReactQueryCacheProvider queryCache={queryCache}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ReactQueryCacheProvider>
);

export default App;
