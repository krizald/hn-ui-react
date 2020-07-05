import { HackerNewsApi } from '../api';
import { NumericDictionary } from '.';
import { Item, ItemModel } from '../models';

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

  PopulateTopStories = async (): Promise<ItemModel[]> => {
    const response = await this.api.fetchTopStories();
    this.topStoryId = response;
    return this.FetchItems(this.topStoryId);
  };

  FetchItems = async (ids: number[], nocache = false): Promise<ItemModel[]> => {
    const res: ItemModel[] = [];
    let requestIds: number[] = [];
    if (nocache) {
      requestIds = ids;
    } else {
      ids.forEach((id) => {
        const item: ItemModel | undefined = this.storyCache[id];
        if (item === undefined) {
          requestIds.push(id);
        } else {
          res.push(item);
        }
      });
    }
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

  FetchItemsWithKids = async (
    ids: number[],
    nocache = false,
  ): Promise<ItemModel[]> => {
    if (ids.length === 0) return [] as ItemModel[];
    const res = await this.FetchItems(ids, nocache);
    await Promise.all(
      res.map(async (item, i) => {
        res[i].kidsItems = await this.FetchItemsWithKids(
          item.kids ? item.kids : ([] as number[]),
          nocache,
        );
      }),
    );
    return res;
  };
}
