/* 

Exercícios de interpretação de código

Exercício 1 

a. []

b. [0, 1, 0, 1, 2, 3]

c. [0, 1, 0, 1, 2, 3, 0, 1, 2, 3, 4, 5]

Exercício 2

a. 0 2 undefined

b. Sim, funcionaria normalmente. Se o número que for usado como entrada estiver na lista, ele vai devolver o índice em que o mesmo
está posicionado, porque se estaria comparando número com número.

Exercício 3

Essa função devolve uma array em que na primeira posição (índice 0) está a soma dos elementos de array de entrada. Na segunda 
posição (índice 1) é o produto dos mesmos elementos.
Um nome da função poderia ser function someEMultiplica (array)

*/

//Exercícios de escrita de código

//Exercício 4

//a.

function calculaIdadeCachorro (anos) {
  if (anos !== undefined) {
    return 7 * anos;
  }
}

const idadeHumano = 4;
const idadeCachorro = calculaIdadeCachorro(idadeHumano);

console.log(idadeHumano + ' anos humanos equivale a ' + idadeCachorro + ' anos de cachorro.');

//b.

function unificaInformacoes (nome, idade, endereco, estudante) {
  if (nome !== undefined && idade !== undefined && endereco !== undefined && typeof(estudante) === typeof(true)) {
    let mensagem = 'Eu sou ' + nome + ', tenho ' + idade + ' anos, moro em ' + endereco + ' e ';
    if (estudante) {
      mensagem += 'sou um estudante.'
    } else {
      mensagem += 'não sou um estudante.'
    }
    return mensagem;
  } 
}

console.log(unificaInformacoes('Goli', 23, 'Rua Guarapari, 190', true));

//Exercício 5

function marcaSeculo (ano) {
  if (ano !== undefined) {
    const seculoRomano = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];
    return 'O ano ' + ano + ' pertence ao século ' + seculoRomano[Math.floor((ano - 1)/100)];
  }
}

console.log(marcaSeculo(1100));
console.log(marcaSeculo(1101));
console.log(marcaSeculo(1534));
console.log(marcaSeculo(1630));

//Exercício 6

const array = [10, 23, 45, 78, 90, 52, 35, 67, 84, 22];

//a.

function contaArray (array) {
  if (array !== undefined) {
    return array.length;
  }
}

//b.

function verificaParidade (numero) {
  if (numero !== undefined) {
    if (numero % 2 === 0) {
      return true;
    } else {
      return false;
    }
  }
}

//c.

function contaPares (array) {
  if (array !== undefined) {
    let contador = 0;
    for (let elemento of array) {
      if (elemento % 2 === 0) {
        contador++;
      }
    }
    return contador;
  }
}

//d.

function contaParesComFuncao (array) {
  if (array !== undefined) {
    let contador = 0;
    for (let elemento of array) {
      if (verificaParidade(elemento)) {
        contador++;
      }
    }
    return contador;
  }
}

console.log(contaArray(array));

console.log(verificaParidade(46));
console.log(verificaParidade(33));

console.log(contaPares(array));

console.log(contaParesComFuncao(array));