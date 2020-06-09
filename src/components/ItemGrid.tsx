import React, { FC, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridReadyEvent, GridOptions } from 'ag-grid-community';
import { StoryStore } from '../stores';
import { ItemModel } from '../model';
import LoadingPanel from './LoadingPanel';

interface ItemGridProps {
  itemId: number[];
  gridOptions?: GridOptions;
}
const ItemGrid: FC<ItemGridProps> = (props: ItemGridProps) => {
  const { itemId, gridOptions } = props;
  const store = StoryStore.GetInstance();
  const [items, setItems] = useState([] as ItemModel[]);
  const [isLoading, setIsLoadig] = useState(true);

  const getItems = (): void => {
    if (itemId.length > 0) {
      setIsLoadig(true);
      store
        .FetchItems(itemId)
        .then((res) => {
          setItems(res);
        })
        .finally(() => {
          setIsLoadig(false);
        });
    }
  };

  const populateItems = (): void => {
    getItems();
  };

  useEffect(populateItems, [itemId]);
  return isLoading ? (
    <LoadingPanel />
  ) : (
    <AgGridReact
      rowData={items}
      gridOptions={gridOptions}
      onGridReady={(e: GridReadyEvent): void => {
        e.api.sizeColumnsToFit();
      }}
      isFullWidthCell={(): boolean => true}
      fullWidthCellRenderer="itemCardRenderer"
    />
  );
};
export default ItemGrid;
