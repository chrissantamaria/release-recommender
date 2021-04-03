import invariant from 'tiny-invariant';
import createValidator, { registerType } from 'typecheck.macro';

import fetchFromSpotify from '@utils/fetchFromSpotify';

type PredictResponse = string[];

registerType('PredictResponse');
const validatePredictResponse = createValidator<PredictResponse>();

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

registerType('TracksResponse');
const validateTracksResponse = createValidator<TracksResponse>();

const fetchRecs = async (trackIds: string[]) => {
  const recIds = await fetch('/api/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(trackIds),
  }).then((res) => res.json());

  invariant(
    validatePredictResponse(recIds),
    '/api/predict response did not match schema'
  );

  const rawTracks = await fetchFromSpotify(
    `https://api.spotify.com/v1/tracks?ids=${recIds.join(',')}`
  );

  invariant(
    validateTracksResponse(rawTracks),
    'https://api.spotify.com/v1/tracks response did not match schema'
  );

  return rawTracks.tracks.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists[0].name,
    album: track.album.name,
  }));
};

export default fetchRecs;
