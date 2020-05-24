import axios, { AxiosResponse } from 'axios';
import apiConfig from './apiConfig';
import Item from '../model';

export default class HackerNewsApi {
  fetchItem = (id: number): Promise<AxiosResponse<Item>> => {
    const query = `${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`;
    return axios.get(query);
  };
}
