export const checkCharacter = (input:string):boolean => {
  if (!input) {
    return true;
  }
  let stack = [];
  for (let char of input) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      const lastOpening = stack.pop();
      if (((lastOpening === '{' && char !== '}') || (lastOpening === '(' && char !== ')') || (lastOpening === '[' && char !== ']')) || !lastOpening) {
        return false;
      }
    }
  }
  if (stack.length) {
    return false;
  }
  return true;
}