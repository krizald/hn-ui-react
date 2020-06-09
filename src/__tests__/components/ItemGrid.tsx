import { mount } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { ItemGrid } from '../../components';
import { HackerNewsApi } from '../../api';
import { StoryStore } from '../../stores';
import { ItemModel } from '../../model';

jest.mock('../../api');

describe('ItemGrid test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render, no api call', () => {
    HackerNewsApi.prototype.fetchItems = jest.fn();
    act(() => {
      mount(<ItemGrid itemId={[]} />);
    });
    expect(HackerNewsApi.prototype.fetchItems).toHaveBeenCalledTimes(0);
  });

  test('should render, api called', () => {
    HackerNewsApi.prototype.fetchItems = jest.fn();
    act(() => {
      mount(<ItemGrid itemId={[1, 2, 3, 4, 5]} />);
    });
    expect(HackerNewsApi.prototype.fetchItems).toHaveBeenCalledTimes(1);
  });

  test('should render, store api called', () => {
    HackerNewsApi.prototype.fetchItems = jest.fn();
    StoryStore.GetInstance().FetchItems = jest
      .fn()
      .mockImplementationOnce(() =>
        Promise.resolve([new ItemModel({ id: 1 })] as ItemModel[]),
      );
    const wrapper = mount(<ItemGrid itemId={[1, 2, 3, 4, 5]} />);
    act(() => {
      wrapper.update();
    });
    expect(HackerNewsApi.prototype.fetchItems).toHaveBeenCalledTimes(0);
    expect(StoryStore.GetInstance().FetchItems).toHaveBeenCalledTimes(1);
    expect(StoryStore.GetInstance().FetchItems).toHaveBeenCalledWith([
      1,
      2,
      3,
      4,
      5,
    ]);
    // const aggrid = wrapper.find('AgGridReact');
    // const rowData = aggrid.prop('rowData') as ItemModel[];
    // expect(rowData).toBe([]);
  });
});
