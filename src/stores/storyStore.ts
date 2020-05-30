import { HackerNewsApi } from '../api';
import { NumericDictionary } from './numericDIctionary';
import { Item } from '../model';

export default class StoryStore {
  storyCache: NumericDictionary<Item>;

  api: HackerNewsApi;

  constructor() {
    this.storyCache = {};
    this.api = new HackerNewsApi();
  }

  PopulateTopStories = (): void => {
    this.api.fetchTopStories().then((response) => {
      const listId = response.data;
      listId.forEach((element) => {
        if (this.storyCache[element] === undefined) {
          this.api.fetchItem(element).then((res) => {
            this.storyCache[element] = res.data;
          });
        }
      });
    });
  };
}
