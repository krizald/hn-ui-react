import { shallow } from 'enzyme';
import React from 'react';
import { TopStoryGrid } from '../../components';
import { StoryStore } from '../../stores';
import { ItemModel } from '../../model';

jest.mock('../../stores/storyStore');
describe('TopStoryGrid test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render a Clear button', () => {
    const testData: ItemModel[] = [{ id: 1 }, { id: 2 }];
    const store = StoryStore.GetInstance();
    StoryStore.prototype.FetchItems = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve(testData);
    });

    const wrapper = shallow(<TopStoryGrid StoryDataStore={store} />);
    expect(
      wrapper
        .find('UnstyledTopStoryGrid')
        .dive()
        .find('button')
        .text(),
    ).toBe('Clean');
  });
});
