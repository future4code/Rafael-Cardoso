const retornaInformacoesNumeros = (array) => {
    const qtde = array.length;
    const arrayImpares = array.filter((item) => {
        return item % 2 === 1;
    });
    const qtdeImpares = arrayImpares.length;
    let soma = 0;
    array.forEach((item) => {
        soma += item;
    });
    return { qtde, qtdeImpares, soma };
};
console.log(retornaInformacoesNumeros([1, 2]));
console.log(retornaInformacoesNumeros([4, 5, 6, 10, 17]));
//# sourceMappingURL=ex3.js.map