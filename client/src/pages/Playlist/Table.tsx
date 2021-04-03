import React from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { Add as AddIcon, Check as CheckIcon } from '@material-ui/icons';

import TrackTable from '@components/TrackTable';
import useStore, { Track } from '@store';

const Row = (track: Track) => {
  const { id, title, artist, album } = track;

  const isInQueue = useStore((state) =>
    state.queue.some((item) => item.id === id)
  );
  const addToQueue = useStore((state) => state.addToQueue);
  const removeFromQueue = useStore((state) => state.removeFromQueue);

  const handleClick = () => {
    if (!isInQueue) {
      addToQueue(track);
    } else {
      removeFromQueue(track);
    }
  };

  const IconComponent = isInQueue ? CheckIcon : AddIcon;

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <IconButton onClick={handleClick}>
          <IconComponent />
        </IconButton>
      </TableCell>
      <TableCell component="th" scope="row">
        {title}
      </TableCell>
      <TableCell>{artist}</TableCell>
      <TableCell>{album}</TableCell>
    </TableRow>
  );
};

const PlaylistTable = ({ tracks }: { tracks: Track[] }) => (
  <TrackTable tracks={tracks} rowComponent={Row} />
);

export default PlaylistTable;
