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

type Props = {
  tracks: {
    id: string;
    title: string;
    artist: string;
    album: string;
  }[];
};

const Table = ({ tracks }: Props) => {
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
          {tracks.map((track) => (
            <TableRow key={track.id}>
              <TableCell component="th" scope="row">
                {track.title}
              </TableCell>
              <TableCell>{track.artist}</TableCell>
              <TableCell>{track.album}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
