import { NumericDictionary } from '../../stores';

describe('Numeric Dictionary test suites', () => {
  test('read/write', () => {
    const dic = new NumericDictionary<string>();
    dic[0] = 'abc';
    expect(dic[0]).toBe('abc');
    expect(dic[1]).toBeUndefined();
  });
});
