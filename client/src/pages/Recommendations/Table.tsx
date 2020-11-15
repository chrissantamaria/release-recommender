import React from 'react';
import {
  Paper,
  Table as MuiTable,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

import { Track } from '../../store';

const Table = ({ tracks }: { tracks: Track[] }) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Artist</TableCell>
            <TableCell>Album</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tracks.map(({ id, title, artist, album }) => (
            <TableRow key={id}>
              <TableCell component="th" scope="row">
                {title}
              </TableCell>
              <TableCell>{artist}</TableCell>
              <TableCell>{album}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
