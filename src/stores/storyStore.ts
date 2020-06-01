import { HackerNewsApi } from '../api';
import { NumericDictionary } from '.';
import { Item, ItemModel } from '../model';

export default class StoryStore {
  private static instance: StoryStore;

  storyCache: NumericDictionary<ItemModel>;

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
    const response = await this.api.fetchTopStories();
    this.topStoryId = response.slice(0, 20);
  };

  FetchItems = async (ids: number[]): Promise<ItemModel[]> => {
    const res: ItemModel[] = [];
    const requestIds: number[] = [];
    ids.forEach((id) => {
      const item: ItemModel | undefined = this.storyCache[id];
      if (item === undefined) {
        requestIds.push(id);
      } else {
        res.push(item);
      }
    });
    const arr = await this.api.fetchItems(requestIds);
    arr.forEach((element) => {
      if (element !== undefined) {
        const item = new ItemModel(element);
        res.push(item);
        this.storyCache[item.id] = item;
      }
    });
    return res;
  };

  GetAllStories = (): ItemModel[] => {
    return Object.values(this.storyCache);
  };
}
