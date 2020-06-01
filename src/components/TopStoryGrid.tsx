import React, { FC, useState, useEffect } from 'react';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import StoryStore from '../stores/storyStore';
import ItemModel from '../model/Item';

interface TopStoryGriProps {
  StoryDataStore: StoryStore;
}

const UnstyledTopStoryGrid: FC<TopStoryGriProps> = (props: TopStoryGriProps) => {
  const { StoryDataStore: store } = props;
  const [stories, setStories] = useState([] as ItemModel[]);

  const populateStoires = (): void => {
    if (stories.length === 0) {
      store.PopulateTopStories().then(() => {
        store.FetchItems(store.topStoryId).then((res) => {
          setStories(res);
        });
      });
    }
  };
  useEffect(populateStoires, []);
  return (
    <div className="ag-theme-balham" style={{ height: '800px', width: '100%' }}>
      <AgGridReact rowData={stories}>
        <AgGridColumn field="id" />
        <AgGridColumn field="type" />
        <AgGridColumn field="title" />
        <AgGridColumn field="url" />
        <AgGridColumn field="createDate" />
      </AgGridReact>
    </div>
  );
};

export default UnstyledTopStoryGrid;
