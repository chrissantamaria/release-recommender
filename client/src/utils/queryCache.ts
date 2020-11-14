import { QueryCache } from 'react-query';
import axios from 'axios';

import useStore from '../store';

const spotifyQueryFn = async (key: string) => {
  const { accessToken, checkAccessToken } = useStore.getState();
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
      refetchOnWindowFocus: false,
    },
  },
});

export default queryCache;
