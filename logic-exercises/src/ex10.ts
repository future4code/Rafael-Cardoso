export const isSudokuValid = (input:string[][]):boolean => {
  for (let item of input) {
    if (!checkRow(item)) {
      return false;
    }
  }
  const columns:string[][] = getColumns(input);
  for (let item of columns) {
    if (!checkRow(item)) {
      return false;
    }
  }
  const boxes:string[][] = getBoxes(input);
  for (let item of boxes) {
    if (!checkRow(item)) {
      return false;
    }
  }
  return true;
}

const checkRow = (input:string[]):boolean => {
  let countDot:number = 0;
  for (let item of input) {
    if (item === '.') {
      countDot++;
    }
  }
  return input.length === new Set(input).size + countDot - 1;
}

const getColumns = (input:string[][]):string[][] => {
  const matrix:string[][] = [];
  for (let i = 0; i < input.length; i++) {
    const columns:string[] = [];
    for (let j = 0; j < input[0].length; j++) {
      columns.push(input[j][i]);
    }
    matrix.push(columns);
  }
  return matrix;
}

const getBoxes = (input:string[][]):string[][] => {
  const matrix:string[][] = [];
  let boxes:string[] = [];
  for (let i = 0; i < input.length / 3; i++) {
    for (let j = 0; j < input[0].length / 3; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = 0; i < input.length / 3; i++) {
    for (let j = input[0].length / 3; j < 2 * input[0].length / 3; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = 0; i < input.length / 3; i++) {
    for (let j = 2 * input[0].length / 3; j < input[0].length; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = input.length / 3; i < 2 * input.length / 3; i++) {
    for (let j = 0; j < input[0].length / 3; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = input.length / 3; i < 2 * input.length / 3; i++) {
    for (let j = input[0].length / 3; j < 2 * input[0].length / 3; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = input.length / 3; i < 2 * input.length / 3; i++) {
    for (let j = 2 * input[0].length / 3; j < input[0].length; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = 2 * input.length / 3; i < input.length; i++) {
    for (let j = 0; j < input[0].length / 3; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = 2 * input.length / 3; i < input.length; i++) {
    for (let j = input[0].length / 3; j < 2 * input[0].length / 3; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  boxes = [];
  for (let i = 2 * input.length / 3; i < input.length; i++) {
    for (let j = 2 * input[0].length / 3; j < input[0].length; j++) {
      boxes.push(input[i][j]);
    }
  }
  matrix.push(boxes);
  return matrix;
}