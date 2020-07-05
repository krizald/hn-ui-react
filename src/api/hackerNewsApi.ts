import axios from 'axios';
import apiConfig from './apiConfig';
import { Item } from '../models';

export default class HackerNewsApi {
  fetchItem = async (id: number): Promise<Item | undefined> => {
    const res = await axios
      .get<Item>(`${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`)
      .catch(() => {
        return undefined;
      });

    if (res !== undefined && res.status === 200) {
      return res.data;
    }
    return undefined;
  };

  // fetchItems = async (ids: number[]): Promise<(Item | undefined)[]> => {
  //   return Promise.all(ids.map((id) => this.fetchItem(id)));
  // };

  fetchTopStories = async (): Promise<number[]> => {
    const res = await axios.get<number[]>(
      `${apiConfig.databaseURL + apiConfig.version}/topstories.json`,
    );
    return res.data;
  };
}
