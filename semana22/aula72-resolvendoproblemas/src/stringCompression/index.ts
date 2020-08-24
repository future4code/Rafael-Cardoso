export const stringCompression = (input:string):string => {
  
  const compression:string[] = [];
  let lastChar:string = input[0];
  let charCount:number = 0;

  for (let item of input) {
    if (item !== lastChar) {
      compression.push(`${lastChar}${charCount}`);
      lastChar = item;
      charCount = 0;
    }
    charCount++;
  }
  compression.push(`${lastChar}${charCount}`);
  
  if (compression.join('').length > input.length) {
    return input;
  }
  return compression.join('');
}