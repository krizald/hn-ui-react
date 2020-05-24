import axios, { AxiosResponse } from 'axios';
import apiConfig from './apiConfig';
import Item from './Item';

export default class hackerNewsApi {
  fetchItem = (id: number): Promise<AxiosResponse<Item>> => {
    const query = `${apiConfig.databaseURL + apiConfig.version}/item/${id}.json`;
    return axios.get(query);
  };
}
