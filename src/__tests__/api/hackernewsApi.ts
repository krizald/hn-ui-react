import axios, { AxiosResponse } from 'axios';
import HackerNewsApi from '../../api';
import { IItem } from '../../model';

jest.mock('axios');

test('pull single item', async () => {
  const data: IItem = {
    by: 'farmer',
    id: 12,
    deleted: false,
    kids: [454421],
    score: 5,
    time: 1160422112,
    title: 'Wired: The Desktop is Dead',
    type: 'story',
    url: 'http://wired.com/wired/archive/14.10/cloudware.html',
  };

  const mockResponse: AxiosResponse<IItem> = {
    data,
    status: 200,
    statusText: 'OK',
    config: {},
    headers: {},
  };
  (axios.get as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve(mockResponse),
  );

  const api = new HackerNewsApi();
  const response = await api.fetchItem(12);
  expect(response.data).toBe(data);
  expect(axios.get).toHaveBeenCalledTimes(1);
  expect(axios.get).toHaveBeenCalledWith(
    'https://hacker-news.firebaseio.com/v0/item/12.json',
  );
});
