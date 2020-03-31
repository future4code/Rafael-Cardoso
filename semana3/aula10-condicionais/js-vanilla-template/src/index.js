/* 

Exercícios de interpretação de código

Exercício 1 

Ele testa se o resto da divisão do número informado pelo usuário por 2 é zero, ou seja, se o número é par. Se o número for par, 
ele mostra no console "Passou no teste.", o resto da divisão por 2 é zero. Já para um número ímpar, divisão por 2 diferente de 
0, mostra no console "Não passou no teste.".

Exercício 2

a. Serve para colocar preço em diferentes frutas no supermercado.

b. "O preço da fruta Maçã é R$2,25"

c. 24,55

d. "O preço da fruta Pêra é R$5"

Exercício 3

Haverá um erro dizendo que mensagem não foi definido. Isso ocorre porque a variável mensagem foi definida usando let dentro do 
bloco do primeiro if, já o console.log foi escrito fora do escopo do mesmo if.

*/

//Exercícios de escrita de código

//Exercício 4

//a.

let numeros = []
numeros[0] = prompt('Digite um número:');
numeros[1] = prompt('Digite outro número:');

if (numeros[0] > numeros[1]) {
  console.log(numeros[0], numeros[1]);
} else {
  console.log(numeros[1], numeros[0]);
}

// No caso dos números serem iguais, será impresso os dois em sequência, seguindo a regra dentro do 'else'.

//b. 

numeros[2] = prompt('Digite mais um número:');

if (numeros[0] > numeros[1] & numeros[1] > numeros[2]) {
  console.log(numeros[0], numeros[1], numeros[2]);
} else if (numeros[2] > numeros[1] && numeros[1] > numeros[0]) {
  console.log(numeros[2], numeros[1], numeros[0]);
} else if (numeros[1] > numeros[2] && numeros[2] > numeros[0]) {
  console.log(numeros[1], numeros[2], numeros[0]);
} else if (numeros[0] > numeros[2] && numeros[2] > numeros[1]) {
  console.log(numeros[0], numeros[2], numeros[1]);
} else if (numeros[2] > numeros[0] && numeros[0] > numeros[1]) {
  console.log(numeros[2], numeros[0], numeros[1]);
} else {
  console.log(numeros[1], numeros[0], numeros[2]);
}

// No caso dos três númerso serem iguais, será impresso os três em sequência, seguindo a regra do 'else'.

//c. 

if (numeros[0] === numeros[1] && numeros[1] === numeros[2]) {
  alert('Os números são iguais, um deles, ao menos deve ser diferente');
} else if (numeros[0] >= numeros[1] & numeros[1] >= numeros[2]) {
  console.log(numeros[0], numeros[1], numeros[2]);
} else if (numeros[2] >= numeros[1] && numeros[1] >= numeros[0]) {
  console.log(numeros[2], numeros[1], numeros[0]);
} else if (numeros[1] >= numeros[2] && numeros[2] >= numeros[0]) {
  console.log(numeros[1], numeros[2], numeros[0]);
} else if (numeros[0] >= numeros[2] && numeros[2] >= numeros[1]) {
  console.log(numeros[0], numeros[2], numeros[1]);
} else if (numeros[2] >= numeros[0] && numeros[0] >= numeros[1]) {
  console.log(numeros[2], numeros[0], numeros[1]);
} else {
  console.log(numeros[1], numeros[0], numeros[2]);
}

// Exercício 5

let animal

if (!(prompt('O animal possui ossos formando seu esqueleto? [s/n]') === 's')) {
  animal = 'Invertebrado';
} else if (prompt('Possui pêlos? [s/n]') === 's') {
  if (prompt('É considerado racional? [s/n]') === 's') {
    animal = 'Ser humano';
  } else {
    animal = 'Mamífero não-humano';
  }
} else if (prompt('Possui penas? [s/n]') === 's') {
  animal = 'Ave';
} else if (!(prompt('É terrestre? [s/n]') === 's')) {
  animal = 'Peixe';
} else if (prompt('Passa uma parte da vida no ambiente aquático? [s/n]') === 's') {
  animal = 'Anfíbio';
} else {
  animal = 'Réptil';
}

console.log('Classificação:',animal);

// Desafio

let nome = prompt('Qual é o seu nome?');
let tipoJogo = prompt('Qual é o tipo de jogo? [IN/DO]').toUpperCase();
let etapaJogo = prompt('Qual a estapa? [SF/DT/FI]').toUpperCase();
let categoria = prompt('Qual a categoria? [1/2/3/4]');
let qtdeIngressos = Number(prompt('Quantos ingressos?'));
let valor;

console.log('---Dados da compra---');
console.log('Nome do cliente:',nome);

if (tipoJogo === 'IN') {
  console.log('Tipo do jogo:','Internacional');
} else if (tipoJogo === 'DO') {
  console.log('Tipo do jogo:','Nacional');
} else {
  console.log('Tipo do jogo inválido');
  tipoJogo = null;
}

if (etapaJogo === 'SF') {
  console.log('Etapa do jogo:','Semifinais');
} else if (etapaJogo === 'DT') {
  console.log('Etapa do jogo:','Decisão do 3 Lugar');
} else if (etapaJogo === 'FI') {
  console.log('Etapa do jogo:','Final');
} else {
  console.log('Etapa do jogo inválido');
  etapaJogo = null;
}

if (categoria === '1' || categoria === '2' || categoria === '3' || categoria === '4') {
  console.log('Categoria:',categoria);
} else {
  console.log('Categoria inválida');
  categoria = null;
}

console.log('Quantidade de ingressos:',qtdeIngressos);
console.log('---Valores---');

if (tipoJogo === null || etapaJogo === null || categoria === null) {
  console.log("compra inválida")
} else if (tipoJogo === 'IN') {
  if (etapaJogo === 'SF') {
    if (categoria === '1') {
      valor = 1320/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else if (categoria === '2') {
      valor = 880/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else if (categoria === '3') {
      valor = 550/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else {
      valor = 220/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    }
  } else if (etapaJogo === 'DT') {
    if (categoria === '1') {
      valor = 660/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else if (categoria === '2') {
      valor = 440/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else if (categoria === '3') {
      valor = 330/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else {
      valor = 170/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    }
  } else {
    if (categoria === '1') {
      valor = 1980/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else if (categoria === '2') {
      valor = 1320/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else if (categoria === '3') {
      valor = 880/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    } else {
      valor = 330/4.1;
      console.log('Valor do ingresso:','US$',valor);
      console.log('Valor total:','US$',valor * qtdeIngressos);
    }
  }
} else {
  if (etapaJogo === 'SF') {
    if (categoria === '1') {
      valor = 1320;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else if (categoria === '2') {
      valor = 880;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else if (categoria === '3') {
      valor = 550;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else {
      valor = 220;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    }
  } else if (etapaJogo === 'DT') {
    if (categoria === '1') {
      valor = 660;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else if (categoria === '2') {
      valor = 440;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else if (categoria === '3') {
      valor = 330;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else {
      valor = 170;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    }
  } else {
    if (categoria === '1') {
      valor = 1980;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else if (categoria === '2') {
      valor = 1320;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else if (categoria === '3') {
      valor = 880;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    } else {
      valor = 330;
      console.log('Valor do ingresso:','R$',valor);
      console.log('Valor total:','R$',valor * qtdeIngressos);
    }
  }
}