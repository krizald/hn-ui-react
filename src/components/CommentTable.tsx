import React, { FC } from 'react';
import { TableContainer, Table } from '@material-ui/core';
import { ItemModel } from '../models';
import { CommentRow } from '.';

interface CommentTableProps {
  data: ItemModel[];
  incident: number;
}

const CommentTable: FC<CommentTableProps> = (props: CommentTableProps) => {
  const { data, incident } = props;
  return (
    <TableContainer>
      <Table>
        {data.map((row: ItemModel) => (
          <CommentRow key={row.id} data={row} incident={incident} />
        ))}
      </Table>
    </TableContainer>
  );
};

export default CommentTable;
