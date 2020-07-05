import React, { FC } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { GridReadyEvent, GridOptions } from 'ag-grid-community';
import { ItemModel } from '../models';

interface ItemGridProps {
  items: ItemModel[];
  gridOptions?: GridOptions;
}
const ItemGrid: FC<ItemGridProps> = (props: ItemGridProps) => {
  const { items, gridOptions } = props;

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
