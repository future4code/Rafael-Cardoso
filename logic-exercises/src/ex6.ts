export const lonelyNumber = (input:number[]):number => {
  return 2 * sumNumbers(getOffRepeteadNumbers(input)) - sumNumbers(input);
}

const sumNumbers = (input:number[]):number => {
  let sum:number = 0;
  for (let item of input) {
    sum += item;
  }
  return sum;
}

const getOffRepeteadNumbers = (input:number[]):number[] => {
  const numbers:number[] = [];
  for (let item of input) {
    if (!checkNumber(numbers, item)) {
      numbers.push(item);
    }
  }
  return numbers;
}

const checkNumber = (input:number[], n:number):boolean => {
  let check:boolean = false;
  for (let item of input) {
    if(item === n) {
      check = true;
    }
  }
  return check;
}