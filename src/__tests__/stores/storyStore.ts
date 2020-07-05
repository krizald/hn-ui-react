import { HackerNewsApi } from '../../api';
import { StoryStore } from '../../stores';
import { Item, ItemModel } from '../../models';

jest.mock('../../api');

describe('Story Store test suites', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('PopulateTopStories: shold return list of items. Some id has to item found', async () => {
    const testData = [1, 2, 3, 4, 5, 6];
    const testDataModel: Item[] = [{ id: 1 }];
    const mockFnFetchTopStories = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });

    const mockFnFetchItem = jest.fn().mockImplementationOnce((i: number) => {
      if (i === 1) return Promise.resolve(testDataModel[0]);
      return Promise.resolve(undefined);
    });
    HackerNewsApi.prototype.fetchTopStories = mockFnFetchTopStories;

    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    const stories = await store.PopulateTopStories();
    expect(stories.length).toBe(1);
    expect(stories[0].id).toBe(1);
    expect(mockFnFetchTopStories).toHaveBeenCalledTimes(1);
    expect(mockFnFetchItem).toHaveBeenCalledTimes(6);
  });

  test('FetchItems: should retrieve all items from api', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFnFetchItem = jest.fn().mockImplementation((i: number) => {
      if (i <= testData.length && i >= 0) return Promise.resolve(testData[i - 1]);
      return undefined;
    });
    // before call
    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    expect(cache[1]).toBeUndefined();
    expect(cache[2]).toBeUndefined();
    expect(cache[3]).toBeUndefined();
    expect(cache[4]).toBeUndefined();
    const res = await store.FetchItems([1, 2, 3, 4, 5]);
    expect(res.length).toBe(4);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(res[3].id).toBe(4);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBe(res[3]);
    expect(mockFnFetchItem).toHaveBeenCalledTimes(5);
    // expect(mockFnFetchItem).toHaveBeenCalledWith(1, 2, 3, 4, 5);
  });

  test('FetchItems: should retrieve all items from cache', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFnFetchItem = jest.fn().mockImplementation((i: number) => {
      if (i <= testData.length && i >= 0) return Promise.resolve(testData[i - 1]);
      return undefined;
    });
    // before call
    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    cache[4] = new ItemModel(testData[3]);
    const res = await store.FetchItems([1, 2, 3, 4]);
    expect(mockFnFetchItem).toHaveBeenCalledTimes(0);
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

  test('FetchItems: should retrieve some items from cache', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFnFetchItem = jest.fn().mockImplementation((i: number) => {
      if (i <= testData.length && i >= 0) return Promise.resolve(testData[i - 1]);
      return undefined;
    });
    // before call
    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    const res = await store.FetchItems([1, 2, 3, 4]);
    expect(mockFnFetchItem).toHaveBeenCalledTimes(1);
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

  test('GetAllStories: should get all stories from cache', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    // before call
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
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

  test('FetchItems: should retrieve items from api, and ignore cache', async () => {
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFnFetchItem = jest.fn().mockImplementation((i: number) => {
      if (i <= testData.length && i >= 0) return Promise.resolve(testData[i - 1]);
      return undefined;
    });
    // before call
    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    cache[4] = new ItemModel(testData[3]);
    const res = await store.FetchItems([1, 2, 3, 4], true);
    expect(mockFnFetchItem).toHaveBeenCalledTimes(4);
    // expect(mockFnFetchItem).toHaveBeenCalledWith([1, 2, 3, 4]);
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
    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFnFetchItem = jest.fn().mockImplementation((i: number) => {
      if (i <= testData.length && i >= 0) return Promise.resolve(testData[i - 1]);
      return undefined;
    });
    // before call
    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    expect(cache[1]).toBeUndefined();
    expect(cache[2]).toBeUndefined();
    expect(cache[3]).toBeUndefined();
    expect(cache[4]).toBeUndefined();
    const res = await store.FetchItems([1, 2, 3, 4, 5]);
    expect(res.length).toBe(4);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[2].id).toBe(3);
    expect(res[3].id).toBe(4);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[2]);
    expect(cache[4]).toBe(res[3]);
    expect(cache[5]).toBeUndefined();
    expect(mockFnFetchItem).toHaveBeenCalledTimes(5);
    // expect(mockFn).toHaveBeenCalledWith([1, 2, 3, 4]);
  });

  test('FetchItemsWithKids: should retrieve item with kids', async () => {
    const testData: Item[] = [
      { id: 1 },
      { id: 2, kids: [3, 4] },
      { id: 3, kids: [5] },
      { id: 4 },
      { id: 5 },
    ];
    const mockFnFetchItem = jest.fn().mockImplementation((i: number) => {
      if (i <= testData.length && i >= 0) return Promise.resolve(testData[i - 1]);
      return undefined;
    });
    // before call
    HackerNewsApi.prototype.fetchItem = mockFnFetchItem;
    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    cache[1] = new ItemModel(testData[0]);
    cache[2] = new ItemModel(testData[1]);
    cache[3] = new ItemModel(testData[2]);
    const res = await store.FetchItemsWithKids([1, 2]);
    expect(mockFnFetchItem).toHaveBeenCalledTimes(2);
    expect(res.length).toBe(2);
    expect(res[0].id).toBe(1);
    expect(res[1].id).toBe(2);
    expect(res[1].kidsItems?.length).toBe(2);
    expect(res[1].kidsItems?.[0].id).toBe(3);
    expect(res[1].kidsItems?.[1].id).toBe(4);
    expect(res[1].kidsItems?.[0].kidsItems?.[0].id).toBe(5);
    expect(cache[1]).toBe(res[0]);
    expect(cache[2]).toBe(res[1]);
    expect(cache[3]).toBe(res[1].kidsItems?.[0]);
    expect(cache[4]).toBe(res[1].kidsItems?.[1]);
    expect(cache[5]).toBe(res[1].kidsItems?.[0].kidsItems?.[0]);
  });
});
