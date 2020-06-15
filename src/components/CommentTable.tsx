import React, { FC, useEffect, useState } from 'react';
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
import { ItemModel } from '../model';
import { StoryStore } from '../stores';
import Constants from '../constants';

interface CommentTableProps {
  data: number[];
}

const useStyles = makeStyles({
  bold: { fontWeight: 'bold' },
});

const CommentTable: FC<CommentTableProps> = (props: CommentTableProps) => {
  const classes = useStyles();
  const { data } = props;
  const store = StoryStore.GetInstance();
  const [comments, setComments] = useState<ItemModel[]>();

  if (data.length === 0) {
    setComments([]);
  }

  const getComments = (): void => {
    if (comments === undefined) {
      store.FetchItems(data).then((res) => {
        setComments(res);
      });
    }
  };
  useEffect(getComments);
  return comments ? (
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
          {comments.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <Grid container spacing={3}>
                  <Grid item xs={3}>
                    <span className={classes.bold}>Author</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span>{row.by}</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span className={classes.bold}>date time</span>
                  </Grid>
                  <Grid item xs={3}>
                    <span>
                      {moment(row.createDate).format(Constants.dateTimeFormat)}
                    </span>
                  </Grid>
                  <Grid item xs={12}>
                    {React.createElement('div', {
                      dangerouslySetInnerHTML: {
                        __html: he.decode(row.text ? row.text : ''),
                      },
                    })}
                  </Grid>
                  {row.kids && row.kids.length > 0 ? (
                    <CommentTable data={row.kids} />
                  ) : null}
                </Grid>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : null;
};

export default CommentTable;
