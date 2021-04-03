import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import useStore, { Track } from '@store';
import { useNavigate } from 'react-router-dom';

import fetchRecs from './fetchRecs';
import data from './data';

import Table from './Table';

const useStyles = makeStyles({
  container: {
    padding: '1rem',
  },
});

const Recommendations = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [recs, setRecs] = useState<null | Track[]>(null);

  useEffect(() => {
    const trackIds = useStore.getState().queue.map((track) => track.id);
    if (!trackIds.length) {
      navigate('/', { replace: true });
      return;
    }

    fetchRecs(data).then(setRecs);
  }, [navigate]);

  if (!recs) return null;

  return (
    <div className={styles.container}>
      <Table tracks={recs} />
    </div>
  );
};

export default Recommendations;
