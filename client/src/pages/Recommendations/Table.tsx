import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';

import TrackTable from '../../components/TrackTable';
import { Track } from '../../store';

const Row = ({ id, title, artist, album }: Track) => (
  <TableRow key={id}>
    <TableCell component="th" scope="row">
      {title}
    </TableCell>
    <TableCell>{artist}</TableCell>
    <TableCell>{album}</TableCell>
  </TableRow>
);

const RecommendationsTable = ({ tracks }: { tracks: Track[] }) => (
  <TrackTable tracks={tracks} rowComponent={Row} />
);

export default RecommendationsTable;
