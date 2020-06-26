const operation: string = process.argv[2].toLowerCase();
const n1: number = Number(process.argv[3]);
const n2: number = Number(process.argv[4]);

if (operation === 'add') {
  console.log(`Resposta: ${n1 + n2}`);
} else if (operation === 'sub') {
  console.log(`Resposta: ${n1 - n2}`);
} else if (operation === 'mult') {
  console.log(`Resposta: ${n1 * n2}`);
} else if (operation === 'div') {
  console.log(`Resposta: ${n1 / n2}`);
} else {
  console.log('Favor insira uma operação existente');
}