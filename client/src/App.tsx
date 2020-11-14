import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import Home from './pages/Home';
import PostLogin from './pages/PostLogin';

const Routes = () => {
  return useRoutes([
    { path: '/', element: <Home /> },
    { path: '/postlogin', element: <PostLogin /> },
  ]);
};

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
