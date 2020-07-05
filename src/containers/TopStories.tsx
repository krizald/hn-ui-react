import React, { FC, useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Button, makeStyles } from '@material-ui/core';
import LoadingOverlay from 'react-loading-overlay';
import { GridOptions } from 'ag-grid-community';
import { StoryStore } from '../stores';
import { LinkCellRenderer, ItemGrid, ItemCardRenderer } from '../components';
import { ItemModel } from '../models';

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
  const [isLoading, setIsLoadig] = useState(true);
  const [stories, setStories] = useState([] as ItemModel[]);
  const refreshStories = (): void => {
    setIsLoadig(true);
    store
      .PopulateTopStories()
      .then((res) => {
        setStories(res);
      })
      .finally(() => {
        setIsLoadig(false);
      });
  };

  useEffect(refreshStories, stories);
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
          <ItemGrid gridOptions={gridOptions} items={stories} />
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default TopStories;
