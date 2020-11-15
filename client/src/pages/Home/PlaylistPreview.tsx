import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

const useStyles = makeStyles({
  container: {
    width: 200,
  },
  img: {
    objectFit: 'cover',
  },
});

type Props = {
  id: string;
  className: undefined | string;
  title: string;
  image: string;
  numTracks: number;
};

const PlaylistPreview = ({ id, className, title, image, numTracks }: Props) => {
  const styles = useStyles();

  const href = `/playlist/${id}`;

  return (
    <div className={clsx(className, styles.container)}>
      <Link component={RouterLink} to={href}>
        <img
          className={styles.img}
          src={image}
          alt={`Artwork for ${title}`}
          width="100%"
          height={200}
        />
      </Link>
      <Link component={RouterLink} to={href}>
        <Typography variant="body1">{title}</Typography>
      </Link>
      <Typography variant="body2">{numTracks} tracks</Typography>
    </div>
  );
};

export default PlaylistPreview;
