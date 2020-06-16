import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import CommentTable from '../../components/CommentTable';
import { StoryStore } from '../../stores';
import { ItemModel } from '../../model';

describe('Comment table test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render a table with data', () => {
    const mockFn = jest.fn().mockImplementationOnce(() => {
      return Promise.resolve([
        new ItemModel({ id: 1, by: 'test user', text: 'test comment' }),
      ] as ItemModel[]);
    });
    StoryStore.GetInstance().FetchItems = mockFn;

    let wrapper: ReactWrapper;
    act(() => {
      wrapper = mount(<CommentTable data={[1]} />);
      setImmediate(() => {
        wrapper = wrapper.update();
        expect(mockFn).toHaveBeenCalledTimes(1);
        expect(
          wrapper
            .find('[data-testid="comment-author"]')
            .first()
            .text(),
        ).toBe('test user');
      });
    });
  });
});
