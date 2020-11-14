import React from 'react';
import { Button } from '@material-ui/core';

const Login = () => (
  <Button
    variant="contained"
    color="primary"
    disableElevation
    onClick={() => {
      window.location.href = '/api/spotify_login';
    }}
  >
    Login
  </Button>
);

export default Login;
