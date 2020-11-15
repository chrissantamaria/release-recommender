import React from 'react';
import {
  IconButton,
  Paper,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { Add as AddIcon, Check as CheckIcon } from '@material-ui/icons';
import find from 'lodash/find';

import useStore, { Track } from '../../store';

const Row = (track: Track) => {
  const { id, title, artist, album } = track;
  const isInQueue = useStore((state) => !!find(state.queue, { id }));
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

const Table = ({ tracks }: { tracks: Track[] }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Album</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map((track) => (
            <Row key={track.id} {...track} />
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
