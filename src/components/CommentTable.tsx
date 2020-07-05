import React, { FC } from 'react';
import {
  Grid,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles,
} from '@material-ui/core';
import moment from 'moment';
import he from 'he';
import { ItemModel } from '../models';
import Constants from '../constants';

interface CommentTableProps {
  data: ItemModel[];
}

const useStyles = makeStyles({
  bold: { fontWeight: 'bold' },
});

const CommentTable: FC<CommentTableProps> = (props: CommentTableProps) => {
  const classes = useStyles();
  const { data } = props;

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <span className={classes.bold}>Comment</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <span className={classes.bold}>Author</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span data-testid="comment-author">{row.by}</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span className={classes.bold}>date time</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span>
                      {moment(row.createDate).format(Constants.dateTimeFormat)}
                    </span>
                  </Grid>
                  <Grid item xs={12} data-testid="comment-text">
                    {React.createElement('div', {
                      dangerouslySetInnerHTML: {
                        __html: he.decode(row.text ? row.text : ''),
                      },
                    })}
                  </Grid>
                  {row.kidsItems && row.kidsItems.length > 0 ? (
                    <CommentTable data={row.kidsItems} />
                  ) : null}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CommentTable;
