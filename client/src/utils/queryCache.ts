import { QueryCache } from 'react-query';
import axios from 'axios';

import useSpotifyStore from '../store/spotify';

const spotifyQueryFn = async (key: string) => {
  const { accessToken, checkAccessToken } = useSpotifyStore.getState();
  await checkAccessToken();

  const { data } = await axios.get(`https://api.spotify.com/v1${key}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      queryFn: spotifyQueryFn,
    },
  },
});

export default queryCache;
