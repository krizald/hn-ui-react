import { Grid, makeStyles, Table, TableCell, TableRow } from '@material-ui/core';
import he from 'he';
import moment from 'moment';
import React, { FC } from 'react';
import Constants from '../constants';
import { ItemModel } from '../models';

interface CommentRowProps {
  data: ItemModel;
  incident: number;
}

const useStyles = makeStyles({
  bold: { fontWeight: 'bold' },
});

const CommentRow: FC<CommentRowProps> = (props: CommentRowProps) => {
  const classes = useStyles();
  const { data, incident } = props;
  return (
    <>
      <TableRow key={data.id}>
        <Table>
          <TableRow key={data.id}>
            <TableCell style={{ width: `${incident.toString()}px` }}>
              <span />
            </TableCell>
            <TableCell component="th" scope="row">
              <Grid container spacing={3}>
                <Grid item xs={3}>
                  <span className={classes.bold}>Author</span>
                </Grid>
                <Grid item xs={3}>
                  <span data-testid="comment-author">{data.by}</span>
                </Grid>
                <Grid item xs={3}>
                  <span className={classes.bold}>date time</span>
                </Grid>
                <Grid item xs={3}>
                  <span>
                    {moment(data.createDate).format(Constants.dateTimeFormat)}
                  </span>
                </Grid>
                <Grid item xs={12} data-testid="comment-text">
                  {React.createElement('div', {
                    dangerouslySetInnerHTML: {
                      __html: he.decode(data.text ? data.text : ''),
                    },
                  })}
                </Grid>
              </Grid>
            </TableCell>
          </TableRow>
        </Table>
      </TableRow>
      {data.kidsItems && data.kidsItems.length > 0
        ? data.kidsItems.map((row: ItemModel) => {
            return (
              <CommentRow
                key={row.id}
                data={row}
                incident={incident + Constants.incidentPerStop}
              />
            );
          })
        : null}
    </>
  );
};
export default CommentRow;
