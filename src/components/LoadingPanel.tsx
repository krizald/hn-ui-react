import React, { FC } from 'react';
import { CircularProgress, Modal } from '@material-ui/core';

const LoadingPanel: FC = () => {
  return (
    <Modal open>
      <div>
        <h2>Loading</h2>
        <CircularProgress />
      </div>
    </Modal>
  );
};

export default LoadingPanel;
