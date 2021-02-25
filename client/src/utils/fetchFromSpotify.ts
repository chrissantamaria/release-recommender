import axios from 'axios';
import useStore from '../store';

export const fetchFromSpotify = async (path: string) => {
  const { getFreshAccessToken } = useStore.getState();
  const accessToken = await getFreshAccessToken();

  const { data } = await axios.get(path, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export default fetchFromSpotify;
