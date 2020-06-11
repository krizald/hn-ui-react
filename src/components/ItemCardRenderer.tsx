import React, { FunctionComponent } from 'react';
import { ICellRendererParams } from 'ag-grid-community';
import moment from 'moment';
import { Grid, makeStyles } from '@material-ui/core';
import { ItemModel } from '../model';

const useStyles = makeStyles({
  boldtext: { 'font-weight': 'bold', 'font-style': 'italic' },
});
type ItemCardRendererProp = ICellRendererParams;

export const UnstyledItemCardRenderer: FunctionComponent<ItemCardRendererProp> = (
  prop: ItemCardRendererProp,
) => {
  const { data } = prop as { data: ItemModel };
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <span className={classes.boldtext}>{data.title}</span>
      </Grid>
      <Grid item xs={2}>
        <span className={classes.boldtext}>Last Updated</span>
      </Grid>
      <Grid item xs={1}>
        <span>{moment(data.createDate).format('MMM Do YYYY, hh:mm:ss')}</span>
      </Grid>
      <Grid item xs={2}>
        <span className={classes.boldtext}>Comments</span>
      </Grid>
      <Grid item xs={1}>
        <span>{data.kids ? data.kids.length : 0}</span>
      </Grid>
      <Grid item xs={6}>
        <a href={data.url} rel="noopener noreferrer" target="_blank">
          {data.url}
        </a>
      </Grid>
    </Grid>
  );
};
export default UnstyledItemCardRenderer;
