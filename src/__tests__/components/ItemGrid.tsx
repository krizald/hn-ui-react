import { shallow, render, mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { act } from '@testing-library/react';

import ReactDOM from 'react-dom';
import ItemGrid from '../../components/ItemGrid';

jest.mock('../../api');

describe('ItemGrid test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('Render: should render nothing', () => {
    expect(render(<ItemGrid items={[]} />)).toMatchSnapshot();
  });

  test('Render: should render single item', () => {
    expect(render(<ItemGrid items={[{ id: 1 }]} />)).toMatchSnapshot();
  });

  test('Render: should render multiple items', () => {
    expect(
      render(<ItemGrid items={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]} />),
    ).toMatchSnapshot();
  });

  test('Render: On Grid Ready event', () => {
    const testData = [{ id: 1 }];
    const container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<ItemGrid items={testData} />, container);
    });
    // expect(container.innerHTML).toBe('');
  });
});
