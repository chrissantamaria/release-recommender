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

import type { Track } from '../store';

type Props = {
  tracks: Track[];
  rowComponent: (track: Track) => JSX.Element;
};

const TrackTable = ({ tracks, rowComponent: Row }: Props) => {
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

export default TrackTable;