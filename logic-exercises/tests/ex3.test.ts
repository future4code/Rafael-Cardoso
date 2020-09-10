import { checkCharacter } from "../src/ex3";

describe('Testing checkCharacter', () => {
  test('test 1', () => {
    const result:boolean = checkCharacter('');
    expect(result).toBe(true);
  });

  test('test 2', () => {
    const result:boolean = checkCharacter('()');
    expect(result).toBe(true);
  });

  test('test 3', () => {
    const result:boolean = checkCharacter('()[]{}');
    expect(result).toBe(true);
  });

  test('test 4', () => {
    const result:boolean = checkCharacter('(]');
    expect(result).toBe(false);
  });

  test('test 5', () => {
    const result:boolean = checkCharacter('([)]');
    expect(result).toBe(false);
  });

  test('test 6', () => {
    const result:boolean = checkCharacter('{[]}');
    expect(result).toBe(true);
  });

  test('test 7', () => {
    const result:boolean = checkCharacter('())');
    expect(result).toBe(false);
  });
});