import axios, { AxiosResponse } from 'axios';
import apiConfig from './apiConfig';
import { IItem } from '../model';

export default class HackerNewsApi {
  fetchItem = (id: number): Promise<AxiosResponse<IItem>> =>
    axios.get<IItem>(`${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`);

  fetchTopStories = (): Promise<AxiosResponse<Array<number>>> =>
    axios.get<Array<number>>(
      `${apiConfig.databaseURL + apiConfig.version}/topstories.json`,
    );
}
