type numero = {
  qtde: number,
  qtdeImpares: number,
  soma: number
}

const retornaInformacoesNumeros: (array: number[]) => numero = (array: number[]):numero => {
  const qtde: number = array.length;
  const arrayImpares: number[] = array.filter((item: number) => {
    return item % 2 === 1;
  });
  const qtdeImpares: number = arrayImpares.length;
  let soma: number = 0;
  array.forEach((item: number) => {
    soma += item;
  });
  return { qtde, qtdeImpares, soma }
}

console.log(retornaInformacoesNumeros([1, 2]));
console.log(retornaInformacoesNumeros([4, 5, 6, 10, 17]));