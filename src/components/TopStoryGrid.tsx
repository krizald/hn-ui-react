import React, { FC, useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, makeStyles } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import { StoryStore } from '../stores';
import { LinkCellRenderer, ItemGrid, ItemCardRenderer } from '.';

const styles = makeStyles({
  gridcontainer: { height: '800px', width: '100%' },
  refreshbutton: { margin: '5px' },
  fullHeight: { height: '100%' },
});

const gridOptions = {
  columnDefs: [{ headerName: 'Top Stories' }],
  frameworkComponents: {
    linkCellRenderer: LinkCellRenderer,
    itemCardRenderer: ItemCardRenderer,
  },
  pagination: true,
  paginationAutoPageSize: true,
  rowHeight: 75,
};

const TopStoryGrid: FC = () => {
  const classes = styles();
  const store = StoryStore.GetInstance();
  const [storyIds, setStoryIds] = useState([] as number[]);
  const [isLoading, setIsLoadig] = useState(true);
  const refreshStories = (): void => {
    setIsLoadig(true);
    store
      .PopulateTopStories()
      .then(() => {
        setStoryIds(store.topStoryId);
      })
      .finally(() => {
        setIsLoadig(false);
      });
  };

  useEffect(refreshStories, storyIds);
  return (
    <div className={`ag-theme-alpine ${classes.gridcontainer}`}>
      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.refreshbutton}
          onClick={(): void => {
            refreshStories();
          }}
        >
          Refresh
        </Button>
      </div>
      <div className={classes.fullHeight}>
        <LoadingOverlay
          active={isLoading}
          spinner
          text="Loading..."
          className={classes.fullHeight}
        >
          <ItemGrid gridOptions={gridOptions} itemId={storyIds} />
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default TopStoryGrid;
