import { getMissingNumber } from '../src/ex1';

describe('Testing getMissingNumber', () => {
  test('test 1', () => {
    const input:number[] = [];
    for (let i = 1; i <= 100; i++) {
      if (i !== 47) {
        input.push(i);
      }
    }

    const result:number = getMissingNumber(input);
    expect(result).toBe(47);
  });

  test('test 2', () => {
    const input:number[] = [];
    for (let i = 1; i <= 100; i++) {
      if (i !== 47) {
        input.push(i);
      }
    }

    const result:number = getMissingNumber(input);
    expect(result).not.toBe(20);
  });

  test('test 3', () => {
    const input:number[] = [];
    for (let i = 1; i <= 100; i++) {
      if (i !== 70) {
        input.push(i);
      }
    }

    const result:number = getMissingNumber(input);
    expect(result).toBe(70);
  });
});