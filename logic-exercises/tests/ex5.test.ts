import { houseRobber } from "../src/ex5";

describe('Testing houseRobber', () => {
  test('test 1', () => {
    const input:number[] = [1, 2, 3, 1];
    const result:number = houseRobber(input);
    expect(result).toBe(4);
  });

  test('test 2', () => {
    const input:number[] = [2, 7, 9, 3, 1];
    const result:number = houseRobber(input);
    expect(result).toBe(12);
  });
  test('test 3', () => {
    const input:number[] = [2,3,6,12,3,9,11,4];
    const result:number = houseRobber(input);
    expect(result).toBe(28);
  });
});