import { render } from 'enzyme';
import React from 'react';
import CommentTable from '../../components/CommentTable';
import { ItemModel } from '../../models';

describe('Comment Table test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Render: no item rendered', () => {
    const wrapper = render(<CommentTable data={[]} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Render: render single item', () => {
    const testData: ItemModel[] = [
      { id: 1, text: 'text1', createDate: new Date(2010, 1, 1), by: 'testuser1' },
    ];
    const wrapper = render(<CommentTable data={testData} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Render: render multiple items in same level', () => {
    const testData: ItemModel[] = [
      { id: 1, text: 'text1', createDate: new Date(2010, 1, 1), by: 'testuser1' },
      { id: 2, text: 'text2', createDate: new Date(2010, 1, 2), by: 'testuser2' },
      { id: 3, text: undefined, createDate: new Date(2010, 1, 3), by: 'testuser3' },
    ];
    const wrapper = render(<CommentTable data={testData} />);
    expect(wrapper).toMatchSnapshot();
  });

  test('Render: render multiple items in multiple levels', () => {
    const testData: ItemModel[] = [
      {
        id: 1,
        text: 'text1',
        createDate: new Date(2010, 1, 1),
        by: 'testuser1',
        kidsItems: [
          {
            id: 2,
            text: 'text2',
            createDate: new Date(2010, 1, 2),
            by: 'testuser2',
            kidsItems: [
              {
                id: 3,
                text: 'text1',
                createDate: new Date(2010, 1, 3),
                by: 'testuser3',
              },
            ],
          },
        ],
      },
    ];
    const wrapper = render(<CommentTable data={testData} />);
    expect(wrapper).toMatchSnapshot();
  });
});
