/* 

Exercícios de interpretação de código

Exercício 1 

Ele soma os números de 0 a 14 (<15) e no final mostra a soma.
No console mostra 105.

Exercício 2

a. Ele "empurra" o item que está dentro dos parênteses para dentro da array, ou seja, ele adiciona esse elemento no fim da array;

b. [10, 15, 25, 30];

c. Se fosse 3, [12, 15, 18, 21, 27, 30] e se fosse 4, [12]

*/

//Exercícios de escrita de código

//Exercício 3

const lista = [80, 30, 130, 40, 60, 21, 70, 120, 90, 103, 110, 55];

//a.

let maior = lista[0];
let menor = lista[0];

for (let i = 1; i < lista.length; i++) {
  const num = lista[i];
  if (num > maior) {
    maior = num;
  } else if (num < menor) {
    menor = num;
  }
}

console.log('O maior número é', maior, 'e o menor é', menor);

const listaDivididaPor10 = [];
const listaPares = [];

for (let numero of lista) {
  //Para realização do item b.
  listaDivididaPor10.push(numero / 10);
  //Para realização do item c.
  if (numero % 2 === 0) {
    listaPares.push(numero);
  }
}

//b. 

console.log(listaDivididaPor10);

//c. 

console.log(listaPares);

//d.

const listaString = [];

for (let i = 0; i < lista.length; i++) {
  const elemento = lista[i];
  listaString.push('O elemento do índex ' + i + ' é: ' + elemento);
  console.log(listaString[i]);
}

//Desafios 

/*

Desafio 1

0
00
000
0000

*/

//Desafio 2

const numeroEscolhido = Number(prompt('Digite um número:'));
console.log('Vamos jogar!');

let numeroChutado;

let contadorChutes = 0;

while (numeroChutado !== numeroEscolhido) {
  numeroChutado = Number(prompt('Chute um número:'));
  console.log('O número chutado foi: ' + numeroChutado);
  if (numeroChutado > numeroEscolhido) {
    console.log('Errrrooooooouuu, é menor!');
  } else if (numeroChutado < numeroEscolhido) {
    console.log('Errrrooooooouuu, é maior!');
  }
  contadorChutes++;
}

console.log('Acertô, mizeravi!!!');
console.log('O número de tentativas foi: ' + contadorChutes);

//Desafio 3

const numeroSorteado = Math.floor(Math.random() * 100) + 1; /* Alteração para incluir número aleatório */
console.log('Vamos jogar!');

let numeroChutado;

let contadorChutes = 0;

while (numeroChutado !== numeroSorteado) {
  numeroChutado = Number(prompt('Chute um número:'));
  console.log('O número chutado foi: ' + numeroChutado);
  if (numeroChutado > numeroSorteado) {
    console.log('Errrrooooooouuu, é menor!');
  } else if (numeroChutado < numeroSorteado) {
    console.log('Errrrooooooouuu, é maior!');
  }
  contadorChutes++;
}

console.log('Acertô, mizeravi!!!');
console.log('O número de tentativas foi: ' + contadorChutes);

/* Foi fácil implementar o sorteio de número porque só foi preciso alterar uma linha de comando, além de já ter uma 
função na biblioteca do JavaScript que faz isso. */