import fetchFromSpotify from '../../utils/fetchFromSpotify';

type TracksResponse = {
  tracks: {
    id: string;
    name: string;
    artists: {
      name: string;
    }[];
    album: {
      name: string;
    };
  }[];
};

const fetchTracks = async (trackIds: string[]) => {
  const data = (await fetchFromSpotify(
    `/tracks?ids=${trackIds.join(',')}`
  )) as TracksResponse;
  return data.tracks.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
  }));
};

export default fetchTracks;
