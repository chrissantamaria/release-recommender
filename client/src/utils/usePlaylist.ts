import { useQuery } from 'react-query';
import { decode } from 'he';
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
      `https://api.spotify.com/v1/playlists/${id}`
    )) as PlaylistResponse;

    return {
      title: decode(data.name),
      description: decode(data.description),
      image: data.images?.[0]?.url,
      tracks: data.tracks.items.map((item) => ({
        id: item.track.id,
        title: decode(item.track.name),
        // TODO: handle multiple artists
        artist: decode(item.track.artists[0].name),
        album: decode(item.track.album.name),
      })),
    };
  });

export default usePlaylist;
