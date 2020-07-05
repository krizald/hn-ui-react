import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { act } from 'react-dom/test-utils';
import CommentTable from '../../components/CommentTable';
import { StoryStore } from '../../stores';
import { ItemModel } from '../../models';

describe('Comment table test suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Dummy test', () => {
    expect(1).toBe(1);
  });
});
