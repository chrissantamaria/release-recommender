import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import useStore from './store';

import Layout from './components/Layout';
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
    : [
        {
          path: '/',
          element: <Layout />,
          children: [
            { path: '/', element: <Home /> },
            { path: 'test', element: <h2>test</h2> },
          ],
        },
      ];

  return useRoutes(routes);
};

export default Routes;
