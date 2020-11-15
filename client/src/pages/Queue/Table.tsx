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
import { Close as CloseIcon } from '@material-ui/icons';

import useStore, { Track } from '../../store';

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
