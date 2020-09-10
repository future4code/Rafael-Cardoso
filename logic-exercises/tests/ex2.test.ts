import { indexOf } from "../src/ex2";

describe('Testting indexOf', () => {
  test('test 1', () => {
    const result:number = indexOf('abcd', 'd');
    expect(result).toBe(3);
  });

  test('test 2', () => {
    const result:number = indexOf('abcd', 'e');
    expect(result).toBe(-1);
  });

  test('test 3', () => {
    const result:number = indexOf('abcda', 'a');
    expect(result).toBe(0);
  });
});