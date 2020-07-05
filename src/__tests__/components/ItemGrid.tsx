import { shallow } from 'enzyme';
import React from 'react';
import ItemGrid from '../../components/ItemGrid';
import { HackerNewsApi } from '../../api';

jest.mock('../../api');

describe('ItemGrid test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('should render nothing', () => {
    const wrapper = shallow(<ItemGrid items={[]} />);
    wrapper.debug();
    console.log(wrapper.debug());
  });
});
