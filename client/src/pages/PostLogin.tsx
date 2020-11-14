import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSeconds } from 'date-fns';

import useSpotifyStore from '../store/spotify';

const PostLogin = () => {
  const navigate = useNavigate();
  const handlePostLogin = useSpotifyStore((state) => state.handlePostLogin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    handlePostLogin(params);
    navigate('/');
  }, [handlePostLogin, navigate]);

  return <div />;
};

export default PostLogin;
