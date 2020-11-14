import React from 'react';
import { Button } from '@material-ui/core';

const Login = () => (
  <Button
    variant="contained"
    color="primary"
    onClick={() => {
      window.location.href = '/api/spotify_login';
    }}
  >
    Login
  </Button>
);

export default Login;
