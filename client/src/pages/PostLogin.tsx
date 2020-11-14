import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useStore from '../store';

const PostLogin = () => {
  const navigate = useNavigate();
  const handlePostLogin = useStore((state) => state.handlePostLogin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    handlePostLogin(params);
    navigate('/', { replace: true });
  }, [handlePostLogin, navigate]);

  return <div />;
};

export default PostLogin;
