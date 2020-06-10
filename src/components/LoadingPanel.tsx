import React, { FC } from 'react';
import { CircularProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  loadingcontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    backgroundColor: '#6e6666',
  },
  loadingitem: { padding: '10px' },
});

const LoadingPanel: FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.loadingcontainer}>
      <div className={classes.loadingitem}>
        <span>Loading...</span>
      </div>
      <div className={classes.loadingitem}>
        <CircularProgress style={{ border: 'none' }} disableShrink />
      </div>
    </div>
  );
};

export default LoadingPanel;
