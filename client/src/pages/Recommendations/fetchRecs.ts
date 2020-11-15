import axios from 'axios';
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

const fetchRecs = async (trackIds: string[]) => {
  const { data: recIds } = await axios.post('/api/predict', trackIds);

  const rawTracks = (await fetchFromSpotify(
    `https://api.spotify.com/v1/tracks?ids=${recIds.join(',')}`
  )) as TracksResponse;

  return rawTracks.tracks.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
  }));
};

export default fetchRecs;