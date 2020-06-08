import React, { FC, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { GridReadyEvent, ValueFormatterParams } from 'ag-grid-community';
import moment from 'moment';
import { StoryStore } from '../stores';
import { ItemModel } from '../model';
import LinkCellRenderer from './LinkCellRenderer';

const styles = { gridcontainer: { height: '800px', width: '100%' } };
type TopStoryGriProps = WithStyles<typeof styles>;
const gridOptions = {
  columnDefs: [
    { field: 'title', headerName: 'Title' },
    {
      field: 'url',
      headerName: 'Link Url',
      cellRenderer: 'linkCellRenderer',
    },
    {
      field: 'createDate',
      headerName: 'Date',
      valueFormatter: (e: ValueFormatterParams): string => {
        return moment(e.value as Date).format('MMM Do YYYY, hh:mm:ss');
      },
    },
  ],
  frameworkComponents: {
    linkCellRenderer: LinkCellRenderer,
  },
  pagination: true,
  paginationAutoPageSize: true,
};

const UnstyledTopStoryGrid: FC<TopStoryGriProps> = (props: TopStoryGriProps) => {
  const { classes } = props;
  const store = StoryStore.GetInstance();
  const [stories, setStories] = useState([] as ItemModel[]);

  const refreshStories = (): void => {
    store.PopulateTopStories().then(() => {
      store.FetchItems(store.topStoryId).then(() => {
        setStories(store.GetAllStories());
      });
    });
  };

  const populateStoires = (): void => {
    if (stories.length === 0) {
      refreshStories();
    }
  };

  useEffect(populateStoires, []);
  return (
    <div className={`ag-theme-alpine ${classes.gridcontainer}`}>
      <button
        type="button"
        onClick={(): void => {
          refreshStories();
        }}
      >
        Clean
      </button>
      <AgGridReact
        rowData={stories}
        gridOptions={gridOptions}
        onGridReady={(e: GridReadyEvent): void => {
          e.api.sizeColumnsToFit();
        }}
      />
    </div>
  );
};

export default withStyles(styles)(UnstyledTopStoryGrid);
