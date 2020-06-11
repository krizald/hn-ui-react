import React, { FunctionComponent } from 'react';
import { ICellRendererParams } from 'ag-grid-community';

export const LinkCellRenderer: FunctionComponent<ICellRendererParams> = (
  prop: ICellRendererParams,
) => {
  const { value } = prop;
  return (
    <a href={value} target="_blank" rel="noopener noreferrer">
      {value}
    </a>
  );
};
export default LinkCellRenderer;
