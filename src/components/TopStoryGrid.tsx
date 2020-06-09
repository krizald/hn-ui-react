import React, { FC, useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, makeStyles } from '@material-ui/core';
import { StoryStore } from '../stores';
import { LinkCellRenderer, ItemGrid, LoadingPanel, ItemCardRenderer } from '.';

const styles = makeStyles({
  gridcontainer: { height: '800px', width: '100%' },
  refreshbutton: { margin: '5px' },
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
      <div style={{ height: '100%' }}>
        {isLoading ? (
          <LoadingPanel />
        ) : (
          <ItemGrid gridOptions={gridOptions} itemId={storyIds} />
        )}
      </div>
    </div>
  );
};

export default TopStoryGrid;
