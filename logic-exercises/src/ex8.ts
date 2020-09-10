export const sumOf2 = (input:number[], target:number):number[] => {
  const nums:number[] = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if((input[i] + input[j]) === target) {
        nums.push(i, j);
      }
    }
  }
  return nums;
}