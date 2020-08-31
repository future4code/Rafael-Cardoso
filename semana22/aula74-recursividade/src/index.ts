const printNumbersAsc = (n:number):void => {
  if (n < 0) {
    return;
  }
  printNumbersAsc(n - 1);
  console.log(n);
}

const printNumbersDesc = (n:number):void => {
  if (n < 0) {
    return;
  }
  console.log(n);
  printNumbersDesc(n - 1);
}

const sumNumbers = (n:number):number => {
  if (n <= 0) {
    return 0;
  }
  return n + sumNumbers(n - 1);
}

const printArray = (array:(number|string)[], idx:number = 0):void => {
  if (idx === array.length) {
    return;
  }
  console.log(`Elemento ${idx} é ${array[idx]}`);
  printArray(array, idx + 1);
}

// printNumbersAsc(10);
// printNumbersDesc(10);
// console.log(sumNumbers(100));
printArray([1, 2, 3, 4]);