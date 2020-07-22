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
  const onGridReady = (e: GridReadyEvent): void => {
    e.api.sizeColumnsToFit();
  };
  const isFullWidthCell = (): boolean => true;
  return (
    <AgGridReact
      rowData={items}
      gridOptions={gridOptions}
      onGridReady={onGridReady}
      isFullWidthCell={isFullWidthCell}
      fullWidthCellRenderer="itemCardRenderer"
    />
  );
};
export default ItemGrid;
