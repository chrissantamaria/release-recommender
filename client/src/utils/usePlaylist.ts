import { useQuery } from 'react-query';
import { decode } from 'he';
import invariant from 'tiny-invariant';
import createValidator, { registerType } from 'typecheck.macro';

import fetchFromSpotify from './fetchFromSpotify';

type PlaylistResponse = {
  name: string;
  description: string;
  images: {
    url: string;
  }[];
  tracks: {
    items: {
      type: string;
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

registerType('PlaylistResponse');
const validatePlaylistResponse = createValidator<PlaylistResponse>();

const usePlaylist = (id: string) =>
  useQuery(['playlist', id], async () => {
    const data = await fetchFromSpotify(
      `https://api.spotify.com/v1/playlists/${id}`
    );

    invariant(
      validatePlaylistResponse(data),
      'https://api.spotify.com/v1/playlists response did not match schema'
    );

    return {
      title: decode(data.name),
      description: decode(data.description),
      image: data.images?.[0]?.url,
      tracks: data.tracks.items
        // Some playlists items with empty track data, filtering those out
        .filter((item) => item.track)
        .map((item) => ({
          id: item.track.id,
          title: decode(item.track.name),
          // TODO: handle multiple artists
          artist: decode(item.track.artists[0].name),
          album: decode(item.track.album.name),
        })),
    };
  });

export default usePlaylist;
