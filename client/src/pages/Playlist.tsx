import React, { forwardRef } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AspectRatio from 'react-aspect-ratio';
import { ArrowDownward } from '@material-ui/icons';
import MaterialTable, { Icons } from 'material-table';

import usePlaylist from '../utils/usePlaylist';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles({
  container: {
    padding: '1rem',
  },
  header: {
    display: 'flex',
    marginBottom: '1rem',
  },
  imageContainer: {
    width: 250,
    marginRight: '1rem',
  },
  image: {
    objectFit: 'cover',
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
});

const tableOptions = {
  columns: [
    {
      title: 'Title',
      field: 'title',
    },
    {
      title: 'Artist',
      field: 'artist',
    },
    {
      title: 'Album',
      field: 'album',
    },
  ],
  options: {
    toolbar: false,
    search: false,
    paging: false,
  },
  icons: {
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
  } as Icons,
};

const Playlist = () => {
  const styles = useStyles();

  const { id } = useParams();
  const { data } = usePlaylist(id);
  if (!data) return null;

  const { title, description, image, tracks } = data;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <AspectRatio className={styles.imageContainer} ratio="1/1">
          <img
            className={styles.image}
            src={image}
            alt={`Artwork for ${title}`}
          />
        </AspectRatio>
        <div className={styles.headerContent}>
          <Typography variant="h3" gutterBottom>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1">{description}</Typography>
          )}
        </div>
      </div>
      <MaterialTable {...tableOptions} data={tracks} />
    </div>
  );
};

export default Playlist;
