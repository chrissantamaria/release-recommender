import useStore from '@store';

export const fetchFromSpotify = async (path: string) => {
  const { getFreshAccessToken } = useStore.getState();
  const accessToken = await getFreshAccessToken();

  return await fetch(path, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((res) => res.json());
};

export default fetchFromSpotify;
