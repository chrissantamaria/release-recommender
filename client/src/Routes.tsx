import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import useStore from './store';

import Login from './pages/Login';
import Home from './pages/Home';
import PostLogin from './pages/PostLogin';

const Routes = () => {
  const accessToken = useStore((state) => state.accessToken);

  const routes = !accessToken
    ? [
        { path: '/', element: <Login /> },
        { path: '/postlogin', element: <PostLogin /> },
      ]
    : [{ path: '/', element: <Home /> }];

  return useRoutes([...routes, { path: '*', element: <Navigate to="/" /> }]);
};

export default Routes;
