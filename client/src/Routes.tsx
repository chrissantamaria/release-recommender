import React from 'react';
import { useRoutes } from 'react-router-dom';

import useStore from './store';

import Login from './pages/Login';
import PostLogin from './pages/PostLogin';
import Layout from './components/Layout';
import Home from './pages/Home';
import Queue from './pages/Queue';
import Playlist from './pages/Playlist';

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
            { path: 'queue', element: <Queue /> },
            { path: 'playlist/:id', element: <Playlist /> },
          ],
        },
      ];

  return useRoutes(routes);
};

export default Routes;
