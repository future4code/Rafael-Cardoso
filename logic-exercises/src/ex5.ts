export const houseRobber = (input:number[]):number => {
  const steal = (idx:number):number => {
    if (idx >= input.length) {
      return 0;
    }
    return Math.max(input[idx] + steal(idx + 2), steal(idx + 1));
  }
  return steal(0);
}