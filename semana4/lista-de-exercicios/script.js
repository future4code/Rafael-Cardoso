/*

Exercícios de leitura de código

1. A função pede para o usuário preencher o valor da cotação do dólar, calcula o valor em reais de US$100 e imprime no console o mesmo.
O valor impresso no console depende do valor da cotação a ser inserido. Para ter um exemplo, se fosse inserido uma cotação de 5, 
o valor impresso no console seria R$500.

2. A função calcula qual seria o valor final para determinados investimentos tendo como parâmetros o tipo de investimento e o valor inicial.
No caso do exemplo, o console imprimiria: 165 \n TIPO DE INVESTIMENTO INFORMADO INCORRETO!

3. O programa, tendo uma array de números, cria duas novas arrays, com a primeira contendo os números pares e a segunda os ímpares.
No console seria impresso: Quantidade total de números 14 \n 6 \n 8.

4. O programa, dado uma array de números, vai encontrar qual é o maior e o menor número nela, exceto se todos os números da array
forem negativos, porque o programa considera o menor número 0. Seria impresso no console -10 \n 1590.

*/

//Exercícios de lógica de programação

//1. 

//a) false

//b) false

//c) true

//d) true

//e) true

/* 2. Não funciona porque a variável quantidadeDeNumerosPares não foi definida e não há incremento do contador do loop, caracterizando 
um loop infinito, além de iteraria até i ser menor ou igual a N, na verdade teria que ser menor */

const quantidadeDeNumerosPares = 5;
let i = 0;
while (i < quantidadeDeNumerosPares) {
    console.log(i * 2);
    i++;
}

//3.

function classificaTriangulo (a, b, c) {
    if (a !== undefined && b !== undefined && c !== undefined) {
        if (a === b && b === c) {
            return 'O triângulo é equilátero.';
        } else if (a !== b && a !== c && b !== c) {
            return 'O triângulo é escaleno.';
        } else {
            return 'O triângulo é isósceles.';
        }
    } else {
        return 'Insira um triângulo válido.'
    }
}

console.log(classificaTriangulo(20, 20, 20));