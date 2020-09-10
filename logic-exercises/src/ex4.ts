export const getMaximumCommon = (input:string[]):string => {
  const maximumLength:number = getMinimumLength(input);
  let maximumCommon:string = '';
  for (let i = 0; i < maximumLength; i++) {
    const ithChars:string[] = [];
    let lastChar = '';
    input.forEach((item) => {
      ithChars.push(item[i]);
      lastChar = item[i];
    });
    if (!checkCharacter(ithChars)) {
      return maximumCommon;
    }
    maximumCommon += lastChar;
  }
  return maximumCommon;
}

const checkCharacter = (input:string[]):boolean => {
  const firstChar:string = input[0];
  let check = true;
  input.forEach((item)  => {
    if (item !== firstChar) {
      check = false;
    }
  });
  return check;
}

const getMinimumLength = (input:string[]):number => {
  let minimum:number = Infinity;
  input.forEach((item) => {
    if (item.length < minimum) {
      minimum = item.length;
    }
  });
  return minimum;
}