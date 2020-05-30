import axios, { AxiosResponse } from 'axios';
import apiConfig from './apiConfig';
import { Item } from '../model';

export default class HackerNewsApi {
  fetchItem = (id: number): Promise<AxiosResponse<Item>> =>
    axios.get<Item>(`${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`);

  fetchTopStories = (): Promise<AxiosResponse<Array<number>>> =>
    axios.get<Array<number>>(
      `${apiConfig.databaseURL + apiConfig.version}/topstories.json`,
    );
}
