import { HackerNewsApi } from '../api';
import NumericDictionary from './numericDIctionary';
import { Item } from '../model';
import ItemModel from '../model/Item';

export default class StoryStore {
  private static instance: StoryStore;

  storyCache: NumericDictionary<Item>;

  topStoryId: number[];

  api: HackerNewsApi;

  topStories: Item[];

  private constructor() {
    this.storyCache = {};
    this.api = new HackerNewsApi();
    this.topStoryId = [];
    this.topStories = [];
  }

  public static GetInstance(): StoryStore {
    if (!StoryStore.instance) {
      StoryStore.instance = new StoryStore();
    }
    return StoryStore.instance;
  }

  PopulateTopStories = async (): Promise<void> => {
    if (this.topStoryId.length === 0) {
      await this.api.fetchTopStories().then((response) => {
        this.topStoryId = response.data.slice(0, 50);
      });
    }
  };

  FetchItems = async (ids: number[]): Promise<ItemModel[]> => {
    return this.api
      .fetchItems(ids)
      .then((arr) => arr.map((res) => new ItemModel(res.data)));
  };

  GetAllStories = (): Item[] => {
    return Object.values(this.storyCache);
  };
}
