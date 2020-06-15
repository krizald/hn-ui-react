import React, { FC, useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, makeStyles } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import { GridOptions } from 'ag-grid-community';
import { StoryStore } from '../stores';
import { LinkCellRenderer, ItemGrid, ItemCardRenderer } from '../components';

const styles = makeStyles({
  gridcontainer: { height: '800px', width: '100%' },
  refreshbutton: { marginBottom: '15px' },
  fullHeight: { height: '100%' },
});

const gridOptions: GridOptions = {
  columnDefs: [{ headerName: 'Top Stories' }],
  frameworkComponents: {
    linkCellRenderer: LinkCellRenderer,
    itemCardRenderer: ItemCardRenderer,
  },
  pagination: true,
  paginationAutoPageSize: true,
  rowHeight: 75,
};

const TopStories: FC = () => {
  const classes = styles();
  const store = StoryStore.GetInstance();
  const [storyIds, setStoryIds] = useState([] as number[]);
  const [isLoading, setIsLoadig] = useState(true);
  const [isChildLoading, setIsChildLoading] = useState(false);
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
          active={isLoading || isChildLoading}
          spinner
          text="Loading..."
          className={classes.fullHeight}
        >
          <ItemGrid
            gridOptions={gridOptions}
            itemId={storyIds}
            onLoaded={(): void => {
              setIsChildLoading(false);
            }}
            onLoading={(): void => {
              setIsChildLoading(true);
            }}
          />
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default TopStories;
