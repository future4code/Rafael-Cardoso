export const getMissingNumber = (numbers:number[]):number => {
  const n:number = numbers.length + 1;
  const expectedSum:number = n * (n + 1) / 2;
  let sum:number = 0;
  numbers.forEach((item:number) => {
    sum += item
  });
  return expectedSum - sum;
}