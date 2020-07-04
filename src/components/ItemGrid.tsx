import React, { FC, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridReadyEvent, GridOptions } from 'ag-grid-community';
import { StoryStore } from '../stores';
import { ItemModel } from '../models';

interface ItemGridProps {
  itemId: number[];
  gridOptions?: GridOptions;
  onLoading?: () => void;
  onLoaded?: () => void;
}
const ItemGrid: FC<ItemGridProps> = (props: ItemGridProps) => {
  const { itemId, gridOptions, onLoading, onLoaded } = props;
  const store = StoryStore.GetInstance();
  const [items, setItems] = useState([] as ItemModel[]);

  const getItems = (): void => {
    if (itemId && itemId.length > 0) {
      if (onLoading) {
        onLoading();
      }
      store
        .FetchItems(itemId)
        .then((res) => {
          setItems(res);
        })
        .finally(() => {
          if (onLoaded) {
            onLoaded();
          }
        });
    }
  };

  const populateItems = (): void => {
    getItems();
  };

  useEffect(populateItems, [itemId]);
  return (
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
