import { AxiosResponse } from 'axios';
import Api from '../../api/hackerNewsApi';

test('pull single item', () => {
  const api = new Api();
  return api.fetchItem(12).then((response: AxiosResponse<Item>) => {
    expect(response.data).toBe('peanut butter');
  });
});
