const imprimeInformacoesNumeros: (n1: number, n2: number) => void = (n1: number, n2: number):void => {
  console.log(n1 + n2);
  console.log(n1 - n2);
  console.log(n1 * n2);
  console.log(n1 > n2 ? n1 : n2);
}

imprimeInformacoesNumeros(10, 5);
imprimeInformacoesNumeros(8, 8);