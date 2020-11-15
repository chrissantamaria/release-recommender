import { useQuery } from 'react-query';
import fetchFromSpotify from './fetchFromSpotify';

type PlaylistResponse = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  tracks: {
    items: {
      track: {
        id: string;
        name: string;
        artists: {
          name: string;
        }[];
        album: {
          name: string;
        };
      };
    }[];
  };
};

const usePlaylist = (id: string) =>
  useQuery(['playlist', id], async () => {
    const data = (await fetchFromSpotify(
      `/playlists/${id}`
    )) as PlaylistResponse;

    return {
      title: data.name,
      description: data.description,
      image: data.images[0].url,
      tracks: data.tracks.items.map((item) => ({
        id: item.track.id,
        title: item.track.name,
        // TODO: handle multiple artists
        artist: item.track.artists[0].name,
        album: item.track.album.name,
      })),
    };
  });

export default usePlaylist;
