import { lonelyNumber } from "../src/ex6";

describe('Testing lonelyNumber', () => {
  test('test 1', () => {
    const input:number[] = [2, 2, 1];
    const result:number = lonelyNumber(input);
    expect(result).toBe(1);
  });

  test('test 2', () => {
    const input:number[] = [4, 1, 2, 1, 2];
    const result:number = lonelyNumber(input);
    expect(result).toBe(4);
  });

  test('test 3', () => {
    const input:number[] = [5, 0, 5, 7, 0, 1, 2, 2, 1];
    const result:number = lonelyNumber(input);
    expect(result).toBe(7);
  });
});