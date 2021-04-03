import { useQuery } from 'react-query';
import { decode } from 'he';
import invariant from 'tiny-invariant';
import createValidator, { registerType } from 'typecheck.macro';

import fetchFromSpotify from './fetchFromSpotify';

type Item = {
  id: string;
  name: string;
  images: {
    url: string;
  }[];
  tracks: {
    total: number;
  };
};

type PlaylistsResponse = {
  items: Item[];
  next: string | null;
};

registerType('PlaylistsResponse');
const validatePlaylistsResponse = createValidator<PlaylistsResponse>();

// Recursively paging through playlist requests
const fetchRawPlaylists = async (
  path: string = 'https://api.spotify.com/v1/me/playlists'
): Promise<Item[]> => {
  const data = await fetchFromSpotify(path);

  invariant(
    validatePlaylistsResponse(data),
    'https://api.spotify.com/v1/me/playlists response did not match schema'
  );

  const { next, items } = data;
  return !next ? items : [...items, ...(await fetchRawPlaylists(next))];
};

const usePlaylists = () =>
  useQuery('playlists', async () => {
    const data = await fetchRawPlaylists();
    return data.map((item) => ({
      id: item.id,
      title: decode(item.name),
      image: item.images?.[0]?.url,
      numTracks: item.tracks.total,
    }));
  });

export default usePlaylists;
