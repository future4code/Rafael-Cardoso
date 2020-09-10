export const countNegativeNumbers = (input:number[][]):number => {
  let count:number = 0;
  for (let array of input) {
    for (let item of array) {
      if (item < 0) {
        count++;
      }
    }
  }
  return count;
}