import { HackerNewsApi } from '../api';
import { NumericDictionary } from '.';
import { ItemModel } from '../models';

export default class StoryStore {
  private static instance: StoryStore;

  itemCache: NumericDictionary<ItemModel>;

  private api: HackerNewsApi;

  private constructor() {
    this.itemCache = {};
    this.api = new HackerNewsApi();
  }

  public static GetInstance(): StoryStore {
    if (!StoryStore.instance) {
      StoryStore.instance = new StoryStore();
    }
    return StoryStore.instance;
  }

  PopulateTopStories = async (): Promise<ItemModel[]> => {
    const response = await this.api.fetchTopStories();
    return this.FetchItems(response);
  };

  FetchItems = async (ids: number[], nocache = false): Promise<ItemModel[]> => {
    const res: ItemModel[] = [];
    let requestIds: number[] = [];
    if (nocache) {
      requestIds = ids;
    } else {
      ids.forEach((id) => {
        if (this.itemCache[id] === undefined) {
          requestIds.push(id);
        }
      });
    }
    await Promise.all(
      requestIds.map(async (id) => {
        const i = await this.api.fetchItem(id);
        if (i) {
          this.itemCache[i.id] = new ItemModel(i);
        }
      }),
    );
    ids.forEach((element) => {
      if (element !== undefined && this.itemCache[element]) {
        res.push(this.itemCache[element]);
      }
    });
    return res;
  };

  GetAllStories = (): ItemModel[] => {
    return Object.values(this.itemCache);
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
