import axios, { AxiosResponse } from 'axios';
import apiConfig from './apiConfig';
import { IItem } from '../model';

export default class HackerNewsApi {
  fetchItem = (id: number): Promise<AxiosResponse<IItem>> => {
    const query = `${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`;
    return axios.get<IItem>(query);
  };
}
