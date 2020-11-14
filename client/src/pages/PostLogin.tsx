import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useSpotifyStore from '../store/spotify';

const PostLogin = () => {
  const navigate = useNavigate();
  const handlePostLogin = useSpotifyStore((state) => state.handlePostLogin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    handlePostLogin({
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token'),
    });

    navigate('/');
  }, [handlePostLogin, navigate]);

  return <div />;
};

export default PostLogin;
