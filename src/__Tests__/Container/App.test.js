import React from 'react';
import { shallow } from 'enzyme';
import App from '../../Container/App';

test('renders learn react link', () => {
  const wrapper = shallow(<App />);
  const label = wrapper.find('[data-testid="app_top_label"]').text();
  expect(label).toEqual('Learn React');
});
