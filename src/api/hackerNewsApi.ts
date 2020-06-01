import axios, { AxiosResponse } from 'axios';
import apiConfig from './apiConfig';
import { Item } from '../model';

export default class HackerNewsApi {
  fetchItem = async (id: number): Promise<AxiosResponse<Item>> =>
    axios.get<Item>(`${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`);

  fetchItems = async (ids: number[]): Promise<AxiosResponse<Item>[]> => {
    return Promise.all(ids.map((id) => this.fetchItem(id)));
  };

  fetchTopStories = async (): Promise<AxiosResponse<Array<number>>> =>
    axios.get<Array<number>>(
      `${apiConfig.databaseURL + apiConfig.version}/topstories.json`,
    );
}
