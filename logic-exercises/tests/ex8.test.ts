import { sumOf2 } from "../src/ex8";

describe('Testing sumOf2', () => {
  test('test 1', () => {
    const result = sumOf2([2, 7, 11, 15], 9);
    expect(result).toEqual([0, 1]);
  });

  test('test 2', () => {
    const result = sumOf2([4, 5, 10, 12, 21], 17);
    expect(result).toEqual([1, 3]);
  });

  test('test 2', () => {
    const result = sumOf2([2, 3, 6, 12, 15], 9);
    expect(result).toEqual([1, 2]);
  });
});