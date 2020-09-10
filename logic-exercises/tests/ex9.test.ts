import { countNegativeNumbers } from "../src/ex9";

describe('Testing countNegativNumbers', () => {
  test('test 1', () => {
    const input:number[][] = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]];
    const result:number = countNegativeNumbers(input);
    expect(result).toBe(8);
  });

  test('test 2', () => {
    const input:number[][] = [[3,2],[1,0]];
    const result:number = countNegativeNumbers(input);
    expect(result).toBe(0);
  });

  test('test 3', () => {
    const input:number[][] = [[1,-1],[-1,-1]];
    const result:number = countNegativeNumbers(input);
    expect(result).toBe(3);
  });

  test('test 4', () => {
    const input:number[][] = [[-1]];
    const result:number = countNegativeNumbers(input);
    expect(result).toBe(1);
  });
});