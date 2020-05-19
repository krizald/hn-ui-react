import React from 'react';
import { mount } from 'enzyme';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = mount(<App />);
});
