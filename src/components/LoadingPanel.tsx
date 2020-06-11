import React, { FC } from 'react';
import LoadingOverlay from 'react-loading-overlay';

interface LoadingPanelProps {
  isActive: boolean;
}
const LoadingPanel: FC<LoadingPanelProps> = (props: LoadingPanelProps) => {
  const { isActive } = props;
  return (
    <LoadingOverlay active={isActive} spinner text="Loading your content...">
      <p>Some content or children or something.</p>
    </LoadingOverlay>
  );
};

export default LoadingPanel;
