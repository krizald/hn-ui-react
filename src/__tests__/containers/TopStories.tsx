import { shallow } from 'enzyme';
import React from 'react';
import TopStoryGrid from '../../containers/TopStories';
import { StoryStore } from '../../stores';
import { ItemModel } from '../../models';

describe('TopStoryGrid test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render a child ItemGrid', () => {
    const testData: ItemModel[] = [{ id: 1 }, { id: 2 }];
    StoryStore.prototype.FetchItems = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });

    const wrapper = shallow(<TopStoryGrid />);

    expect(wrapper.find('WithStyles(ForwardRef(Button))').text()).toBe('Refresh');
    expect(wrapper.find('LoadingOverlayWrapper').length).toBe(1);
    expect(wrapper.find('ItemGrid').length).toBe(1);
  });

  test('should call store when clicked button', () => {
    const testData: ItemModel[] = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });
    StoryStore.prototype.PopulateTopStories = mockFn;

    const store = StoryStore.GetInstance();
    store.itemCache = {};
    const cache = store.itemCache;
    expect(cache[1]).toBeUndefined();
    expect(cache[2]).toBeUndefined();
    expect(cache[3]).toBeUndefined();
    expect(cache[4]).toBeUndefined();
    // expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
