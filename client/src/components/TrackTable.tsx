import React from 'react';
import {
  Table as MuiTable,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import type { Track } from '@store';

type Props = {
  tracks: Track[];
  rowComponent: (track: Track) => JSX.Element;
  includeEmptyCol?: boolean;
};

const TrackTable = ({
  includeEmptyCol = true,
  tracks,
  rowComponent: Row,
}: Props) => {
  return (
    <TableContainer component={Paper}>
      <MuiTable>
        <TableHead>
          <TableRow>
            {includeEmptyCol && <TableCell />}
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
