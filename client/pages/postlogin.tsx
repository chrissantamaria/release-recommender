import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useSpotifyStore from '../store/spotify';

const PostLogin = () => {
  const router = useRouter();
  const handlePostLogin = useSpotifyStore((state) => state.handlePostLogin);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    handlePostLogin({
      accessToken: params.get('access_token'),
      refreshToken: params.get('refresh_token'),
    });

    router.push('/');
  }, [handlePostLogin, router]);

  return <div />;
};

export default PostLogin;
