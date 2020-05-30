import axios, { AxiosResponse } from 'axios';
import { HackerNewsApi } from '../../api';
import { Item } from '../../model';

jest.mock('axios');

describe('Hacker News Api test suites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('It should return a single item json', async () => {
    const data: Item = {
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

    const mockResponse: AxiosResponse<Item> = {
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

  test('It should return a list of ids', async () => {
    const data = [1, 2, 3, 4, 5, 6, 10];

    const mockResponse: AxiosResponse<Array<number>> = {
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
    const response = await api.fetchTopStories();
    expect(response.data).toBe(data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
    );
  });
});
