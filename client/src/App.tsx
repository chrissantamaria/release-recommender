import React from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';

import useSpotifyStore from './store/spotify';

import Login from './pages/Login';
import Home from './pages/Home';
import PostLogin from './pages/PostLogin';

const Routes = () => {
  const accessToken = useSpotifyStore((state) => state.accessToken);

  const routes = !accessToken
    ? [
        { path: '/', element: <Login /> },
        { path: '/postlogin', element: <PostLogin /> },
      ]
    : [{ path: '/', element: <Home /> }];

  return useRoutes([...routes, { path: '*', element: <Navigate to="/" /> }]);
};

const App = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
