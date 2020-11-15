import axios from 'axios';
import useStore from '../store';

export const fetchFromSpotify = async (path: string) => {
  const { accessToken, checkAccessToken } = useStore.getState();
  await checkAccessToken();

  const { data } = await axios.get(`https://api.spotify.com/v1${path}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};

export default fetchFromSpotify;
