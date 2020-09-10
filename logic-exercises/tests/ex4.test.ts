import { getMaximumCommon } from "../src/ex4";

describe('Testing getMaximumCommon' , () => {
  test('test 1', () => {
    const input:string[] = ["flower","flow","flight"];
    const result:string = getMaximumCommon(input);
    expect(result).toBe('fl');
  });

  test('test 2', () => {
    const input:string[] = ["dog","racecar","car"];
    const result:string = getMaximumCommon(input);
    expect(result).toBe('');
  });

  test('test 3', () => {
    const input:string[] = ["coracao","cor","corona","coreia"];
    const result:string = getMaximumCommon(input);
    expect(result).toBe('cor');
  });
});