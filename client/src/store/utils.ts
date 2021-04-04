import type { Track } from './types';

export const appendUniqueTracks = (
  existingTracks: Track[],
  newTracks: Track[]
) => {
  const existingTrackIds = new Set(existingTracks.map((track) => track.id));

  const tracks = [...existingTracks];
  for (const track of newTracks) {
    if (!existingTrackIds.has(track.id)) {
      tracks.push(track);
    }
  }

  return tracks;
};
