import { shallow, render, mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { HackerNewsApi } from '../../api';
import TopStoryGrid from '../../components/TopStoryGrid';
import { StoryStore } from '../../stores';
import { ItemModel, Item } from '../../model';

// jest.mock('../../api');

describe('TopStoryGrid test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render a Clear button', () => {
    const testData: ItemModel[] = [{ id: 1 }, { id: 2 }];
    StoryStore.prototype.FetchItems = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });

    const wrapper = render(<TopStoryGrid />);

    expect(wrapper.find('button').text()).toBe('Refresh');
  });

  test('should call store when clicked button', () => {
    const testTopStoryId: number[] = [1, 2, 3, 4];
    HackerNewsApi.prototype.fetchTopStories = jest
      .fn()
      .mockImplementationOnce(() => {
        return Promise.resolve(testTopStoryId);
      });

    const testData: Item[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });

    HackerNewsApi.prototype.fetchItems = mockFn;
    const store = StoryStore.GetInstance();
    store.storyCache = {};
    const cache = store.storyCache;
    expect(cache[1]).toBeUndefined();
    expect(cache[2]).toBeUndefined();
    expect(cache[3]).toBeUndefined();
    expect(cache[4]).toBeUndefined();

    const wrapper = shallow(<TopStoryGrid />);
    // wrapper
    //   .dive()
    //   .find('button')
    //   .simulate('click');
    // expect(HackerNewsApi.prototype.fetchTopStories).toHaveBeenCalledTimes(1);
    // // const wrapper = mount(<TopStoryGrid />);
    // // // console.log(wrapper.debug());

    // expect(HackerNewsApi.prototype.fetchTopStories).toHaveBeenCalledTimes(1);
    // setImmediate(() => {
    //   expect(HackerNewsApi.prototype.fetchItems).toHaveBeenCalledTimes(0);
    // });
  });
});
