import React from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import useSpotifyStore from './store/spotify';

import Login from './pages/Login';
import Home from './pages/Home';
import PostLogin from './pages/PostLogin';

const Routes = () => {
  const accessToken = useSpotifyStore((state) => state.accessToken);

  return useRoutes(
    !accessToken
      ? [
          { path: '/', element: <Login /> },
          { path: '/postlogin', element: <PostLogin /> },
        ]
      : [{ path: '/', element: <Home /> }]
  );
};

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
