import React, { FC, useState, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import moment from 'moment';
import { Grid, makeStyles } from '@material-ui/core';
import { StoryStore } from '../stores';
import { ItemModel } from '../models';
import { CommentTable } from '../components';
import Constants from '../constants';

type ItemDetailParams = {
  id: string;
};

const useStyles = makeStyles({
  bold: { fontWeight: 'bold' },
});

type ItemDetailProps = RouteComponentProps<ItemDetailParams>;

const ItemDetail: FC<ItemDetailProps> = (props: ItemDetailProps) => {
  const { match } = props;
  const [item, setItem] = useState<ItemModel>();
  const id: number = parseInt(match.params.id, 10);
  const store = StoryStore.GetInstance();
  const classes = useStyles();

  const getItem = (): void => {
    store.FetchItems([id], true).then((items) => {
      if (items.length === 0 || items[0] === undefined) {
        setItem({ id: 0 });
      } else {
        setItem(items[0]);
      }
    });
  };
  useEffect(() => {
    if (item === undefined) {
      getItem();
    }
  });

  return item && item?.id > 0 ? (
    <div style={{ height: '900px' }}>
      <Grid container spacing={3}>
        <Grid item xs={11}>
          <span className={classes.bold}>{item.title}</span>
        </Grid>
        <Grid item xs={1}>
          <span>{item.by}</span>
        </Grid>
        <Grid item xs={3}>
          <span className={classes.bold}>Last Updated</span>
        </Grid>
        <Grid item xs={3}>
          <span>{moment(item.createDate).format(Constants.dateTimeFormat)}</span>
        </Grid>
        <Grid item xs={3}>
          <span className={classes.bold}>Score</span>
        </Grid>
        <Grid item xs={3}>
          <span>{item.score}</span>
        </Grid>
      </Grid>
      <CommentTable data={item.kids ? item.kids : []} />
    </div>
  ) : null;
};

export default withRouter(ItemDetail);
