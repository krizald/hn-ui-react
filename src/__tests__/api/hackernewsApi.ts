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
    expect(response).toBe(data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/12.json',
    );
  });

  test('It should return a undefined when request failed', async () => {
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
      status: 404,
      statusText: 'ERROR',
      config: {},
      headers: {},
    };
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(mockResponse),
    );

    const api = new HackerNewsApi();
    const response = await api.fetchItem(12);
    expect(response).toBe(undefined);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/12.json',
    );
  });

  test('It should return undefined when rejected', async () => {
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
      statusText: 'Ok',
      config: {},
      headers: {},
    };
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(mockResponse),
    );

    const api = new HackerNewsApi();
    const response = await api.fetchItem(12);
    expect(response).toBe(undefined);
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
    expect(response).toBe(data);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/topstories.json',
    );
  });

  test('It should return a list of items', async () => {
    const data: Item[] = [
      {
        by: 'farmer',
        id: 12,
        deleted: false,
        kids: [454421],
        score: 5,
        time: 1160422112,
        title: 'Wired: The Desktop is Dead',
        type: 'story',
        url: 'http://wired.com/wired/archive/14.10/cloudware.html',
      },
      {
        by: 'farmer',
        id: 13,
        deleted: false,
        kids: [454421],
        score: 5,
        time: 1160422112,
        title: 'Wired: The Desktop is Dead',
        type: 'story',
        url: 'http://wired.com/wired/archive/14.10/cloudware.html',
      },
      {
        by: 'farmer',
        id: 14,
        deleted: false,
        kids: [454421],
        score: 5,
        time: 1160422112,
        title: 'Wired: The Desktop is Dead',
        type: 'story',
        url: 'http://wired.com/wired/archive/14.10/cloudware.html',
      },
    ];

    const mockResponse1: AxiosResponse<Item> = {
      data: data[0],
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const mockResponse2: AxiosResponse<Item> = {
      data: data[1],
      status: 200,
      statusText: 'OK',
      config: {},
      headers: {},
    };

    const mockResponse3: AxiosResponse<Item> = {
      data: data[2],
      status: 400,
      statusText: 'Ok',
      config: {},
      headers: {},
    };

    (axios.get as jest.Mock).mockImplementation((r: string) => {
      switch (r) {
        case 'https://hacker-news.firebaseio.com/v0/item/12.json':
          return Promise.resolve(mockResponse1);
        case 'https://hacker-news.firebaseio.com/v0/item/13.json':
          return Promise.resolve(mockResponse2);
        case 'https://hacker-news.firebaseio.com/v0/item/14.json':
          return Promise.resolve(mockResponse3);
        default:
          return Promise.reject(new Error('oops'));
      }
    });

    const api = new HackerNewsApi();
    const response = await api.fetchItems([12, 13, 14, 15]);
    expect(data.length).toBe(3);
    expect(data).toContain(response[0]);
    expect(data).toContain(response[1]);
    expect(undefined).toBe(response[2]);
    expect(axios.get).toHaveBeenCalledTimes(4);
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/12.json',
    );
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/13.json',
    );
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/14.json',
    );
    expect(axios.get).toHaveBeenCalledWith(
      'https://hacker-news.firebaseio.com/v0/item/15.json',
    );
  });
});
