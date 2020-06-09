import React, { FC, useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { StoryStore } from '../stores';
import { LinkCellRenderer, ItemGrid, LoadingPanel, ItemCardRenderer } from '.';

const styles = {
  gridcontainer: { height: '800px', width: '100%' },
  refreshbutton: { margin: '5px' },
};
type TopStoryGriProps = WithStyles<typeof styles>;
const gridOptions = {
  columnDefs: [{ headerName: 'Top Stories' }],
  frameworkComponents: {
    linkCellRenderer: LinkCellRenderer,
    itemCardRenderer: ItemCardRenderer,
  },
  pagination: true,
  paginationAutoPageSize: true,
  rowHeight: 100,
};

const UnstyledTopStoryGrid: FC<TopStoryGriProps> = (props: TopStoryGriProps) => {
  const { classes } = props;
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
      {isLoading ? (
        <LoadingPanel />
      ) : (
        <ItemGrid gridOptions={gridOptions} itemId={storyIds} />
      )}
    </div>
  );
};

export default withStyles(styles)(UnstyledTopStoryGrid);
