import { isAnagram } from "../src/ex7";

describe('Testing isAnagram', () => {
  test('test 1', () => {
    const result:boolean = isAnagram('anagrama', 'nagarama');
    expect(result).toBe(true);
  });

  test('test 2', () => {
    const result:boolean = isAnagram('gato', 'toga');
    expect(result).toBe(true);
  });

  test('test 3', () => {
    const result:boolean = isAnagram('gato', 'rato');
    expect(result).toBe(false);
  });
});