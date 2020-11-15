import React from 'react';
import { useParams } from 'react-router-dom';

import usePlaylist from '../utils/usePlaylist';

const Playlist = () => {
  const { id } = useParams();
  const { data } = usePlaylist(id);
  if (!data) return null;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Playlist;
