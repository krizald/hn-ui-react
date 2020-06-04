import { HackerNewsApi } from '../../api';
import { StoryStore } from '../../stores';
import { Item, ItemModel } from '../../model';

jest.mock('../../api');

describe('Story Store test suites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetch top stories id', async () => {
    const testData = [1, 2, 3, 4, 5, 6];
    HackerNewsApi.prototype.fetchTopStories = jest
      .fn()
      .mockImplementationOnce(() => {
        return Promise.resolve(testData);
      });
    const store = StoryStore.GetInstance();
    await store.PopulateTopStories();
    expect(store.topStoryId).toBe(testData);
  });

  test('fetch items', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });
    // before call
    HackerNewsApi.prototype.fetchItems = mockFn;
    const store = StoryStore.GetInstance();
    store.storyCache = {};
    const cache = store.storyCache;
    expect(cache[1]).toBeUndefined();
    expect(cache[2]).toBeUndefined();
    expect(cache[3]).toBeUndefined();
    expect(cache[4]).toBeUndefined();
    const res = await store.FetchItems([1, 2, 3, 4]);
    expect(res.length).toBe(4);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(res[3].id).toBe(4);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBe(res[3]);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith([1, 2, 3, 4]);
  });

  test('fetch items which are already cached', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve([]);
    });
    // before call
    HackerNewsApi.prototype.fetchItems = mockFn;
    const store = StoryStore.GetInstance();
    store.storyCache = {};
    const cache = store.storyCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    cache[4] = new ItemModel(testData[3]);
    const res = await store.FetchItems([1, 2, 3, 4]);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith([]);
    expect(res.length).toBe(4);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(res[3].id).toBe(4);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBe(res[3]);
  });

  test('get all stories from cache', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    // before call
    const store = StoryStore.GetInstance();
    store.storyCache = {};
    const cache = store.storyCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    cache[4] = new ItemModel(testData[3]);
    const res = store.GetAllStories();
    expect(res.length).toBe(4);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(res[3].id).toBe(4);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBe(res[3]);
  });

  test('fetch items which are already cached, ignore cache', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });
    // before call
    HackerNewsApi.prototype.fetchItems = mockFn;
    const store = StoryStore.GetInstance();
    store.storyCache = {};
    const cache = store.storyCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    cache[4] = new ItemModel(testData[3]);
    const res = await store.FetchItems([1, 2, 3, 4], true);
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith([1, 2, 3, 4]);
    expect(res.length).toBe(4);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(res[3].id).toBe(4);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBe(res[3]);
  });

  test('fetch items with some undefined', async () => {
    const testData: (ItemModel | undefined)[] = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      undefined,
    ];
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });
    // before call
    HackerNewsApi.prototype.fetchItems = mockFn;
    const store = StoryStore.GetInstance();
    store.storyCache = {};
    const cache = store.storyCache;
    expect(cache[1]).toBeUndefined();
    expect(cache[2]).toBeUndefined();
    expect(cache[3]).toBeUndefined();
    expect(cache[4]).toBeUndefined();
    const res = await store.FetchItems([1, 2, 3, 4]);
    expect(res.length).toBe(3);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBeUndefined();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith([1, 2, 3, 4]);
  });
});
