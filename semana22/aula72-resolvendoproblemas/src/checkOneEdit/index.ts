export const checkOneEdit = (src:string, comp:string):boolean => {

  if (src.length > comp.length + 1 || src.length < comp.length - 1) {
    return false;
  }

  let countCommunChar:number = 0;

  for (let i = 0; i < src.length; i++) {
    if (src[i] === comp[i]) {
      countCommunChar++;
    }
  }
  
  if (src.length === comp.length) {
    return src.length <= countCommunChar + 1;
  }
  if (src.length < comp.length) {
    return src.length === countCommunChar;
  }
  return comp.length === countCommunChar;
}