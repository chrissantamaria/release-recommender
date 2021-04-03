import React from 'react';
import { IconButton, TableRow, TableCell } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';

import TrackTable from '@components/TrackTable';
import useStore, { Track } from '@store';

const Row = (track: Track) => {
  const { title, artist, album } = track;
  const removeFromQueue = useStore((state) => state.removeFromQueue);

  const handleClick = () => {
    removeFromQueue(track);
  };

  return (
    <TableRow>
      <TableCell padding="checkbox">
        <IconButton onClick={handleClick}>
          <CloseIcon />
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

const QueueTable = ({ tracks }: { tracks: Track[] }) => (
  <TrackTable tracks={tracks} rowComponent={Row} />
);

export default QueueTable;
