// a) Ao tentar atribuir um número dá erro, diz que não é uma string

const minhaString: string = 'eu';

console.log(minhaString);

// b) Para aceitar letras, pode atribuir a tipo any ao declarar meuNumero

const meuNumero: number = 2;

console.log(meuNumero);

// c) Criar uma variável de tipo

type pessoa = {
  nome: string,
  idade: number,
  corFavorita: CoresArcoIris
}

// const jony: pessoa = {
//   nome: 'Jony',
//   idade: 22,
//   corFavorita: 'azul'
// }

// console.log(jony);

// d)

// const maria: pessoa = {
//   nome: 'Maria',
//   idade: 30,
//   corFavorita: 'rosa'
// }

// const antonio: pessoa = {
//   nome: 'Antonio',
//   idade: 40,
//   corFavorita: 'amarelo'
// }

// const joana: pessoa = {
//   nome: 'Joana',
//   idade: 53,
//   corFavorita: 'bege'
// }

// console.log(maria, antonio, joana);

// e)

enum CoresArcoIris {
  VERMELHO = 'Vermelho',
  LARANJA = 'Laranja',
  AMARELO = 'Amarelo',
  VERDE = 'Verde',
  AZUL = 'Azul',
  ANIL = 'Anil',
  VIOLETA = 'Violeta'
}

const jony: pessoa = {
  nome: 'Jony',
  idade: 22,
  corFavorita: CoresArcoIris.AZUL
}

const maria: pessoa = {
  nome: 'Maria',
  idade: 30,
  corFavorita: CoresArcoIris.VIOLETA
}

const antonio: pessoa = {
  nome: 'Antonio',
  idade: 40,
  corFavorita: CoresArcoIris.AMARELO
}

const joana: pessoa = {
  nome: 'Joana',
  idade: 53,
  corFavorita: CoresArcoIris.LARANJA
}

console.log(jony, maria, antonio, joana);