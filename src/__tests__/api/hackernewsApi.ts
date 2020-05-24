import HackerNewsApi from '../../api';

test('pull single item', async () => {
  const api = new HackerNewsApi();
  const response = await api.fetchItem(12);
  expect(response.data).toBe({
    by: 'farmer',
    descendants: 0,
    id: 12,
    kids: [454421],
    score: 5,
    time: 1160422112,
    title: 'Wired: The Desktop is Dead',
    type: 'story',
    url: 'http://wired.com/wired/archive/14.10/cloudware.html',
  });
});
