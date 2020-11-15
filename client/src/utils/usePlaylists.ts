import { useQuery } from 'react-query';
import fetchFromSpotify from './fetchFromSpotify';

type PlaylistsResponse = {
  items: {
    id: string;
    name: string;
    images: {
      url: string;
    }[];
    tracks: {
      total: number;
    };
  }[];
};

const usePlaylists = () =>
  useQuery('playlists', async () => {
    const data = (await fetchFromSpotify('/me/playlists')) as PlaylistsResponse;
    return data.items.map((item) => ({
      id: item.id,
      title: item.name,
      image: item.images[0].url,
      numTracks: item.tracks.total,
    }));
  });

export default usePlaylists;
