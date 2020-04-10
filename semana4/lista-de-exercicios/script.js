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

//4. 

function mostraMaior (a, b) {
    if (a > b) {
        return 'O maior é ' + a; 
    } else {
        return 'O maior é: ' + b;
    }
    
}

function indicaIndivisibilidade (a, b) {
    if (a % b === 0) {
        return a + ' é divisível por ' + b;
    } else {
        return a + ' não é divisível por ' + b;
    }
}

function determinaDiferença (a, b) {
    if (a > b) {
        return 'A diferença entre eles é ' + (a - b);
    } else {
        return 'A diferença entre eles é ' + (b - a);
    }
}

const numero1 = 15;
const numero2 = 30;

if (numero1 !== undefined && numero2 !== undefined) {

    console.log('Entrada:');
    console.log(`${numero1} e ${numero2}`)
    console.log('Saída:');
    console.log(mostraMaior(numero1, numero2));
    console.log(indicaIndivisibilidade(numero1, numero2));
    console.log(indicaIndivisibilidade(numero2, numero1));
    console.log(determinaDiferença(numero1, numero2));
}

//Exercícios de funções

//1.

function imprimeSegundoMaiorESegundoMenor (array) {
    let indexMaior;
    let indexMenor;
    let numeroMaior = -Infinity;
    let numeroMenor = Infinity;
    let arraySec = [];
    for (numero of array) {
        arraySec.push(numero);
        if (numero > numeroMaior) {
            numeroMaior = numero;
            indexMaior = array.indexOf(numero);
        }
        if (numero < numeroMenor) {
            numeroMenor = numero;
            indexMenor = array.indexOf(numero);
        }
    }
    if (indexMaior < indexMenor) {
        arraySec.splice(indexMenor, 1);
        arraySec.splice(indexMaior, 1);
    } else {
        arraySec.splice(indexMaior, 1);
        arraySec.splice(indexMenor, 1);
    }
    numeroMaior = -Infinity;
    numeroMenor = Infinity;
    for (numero of arraySec) {
        if (numero > numeroMaior) {
            numeroMaior = numero;
        }
        if (numero < numeroMenor) {
            numeroMenor = numero;
        }
    }
    console.log(`O segundo número maior é ${numeroMaior} é o segundo número menor é ${numeroMenor}.`);
} 

let arrayNumeros = [6, 78, 4, 21, 32, 9, 45, 2, 80];
imprimeSegundoMaiorESegundoMenor(arrayNumeros);

//2.

// let helloFuture4 = function () {
//     alert('Hello Future4');
// }

// helloFuture4();

//Exercícios de objetos

/*

1. Objetos são usados para representar dados de forma mais intuitiva, digamos assim, em que as propriedades tem um nome que facilite 
a compreensão, mas isso é feita sem precisar ser ordenada. O array é usado também para guardar várias informações, mas em forma de lista,
em que é feita de forma ordenada, usando para acessar cada elemento um índice que representa a posição de cada um.

*/

//2.

function criaRetangulo (a, b) {
    let retangulo = {
        largura: a,
        altura: b,
        perimetro: 2 * (a + b),
        area: a * b
    }
    return retangulo;
}

//3.

function imprimeFilme (objeto) {
    let impressao = `Venha assistir ao filme ${objeto.titulo}, de ${objeto.ano}, dirigido por ${objeto.diretor} e estrelado por ${objeto.elenco[0]}`;
    for (i = 1; i < objeto.elenco.length; i++) {
        impressao += `, ${objeto.elenco[i]}`
    }
    impressao += '.'
    console.log(impressao);
}

let filmeFavorito = {
    titulo: 'O Poderoso Chefão',
    ano: '1972',
    diretor: 'Francis Ford Copolla',
    elenco: ['Marlon Brando', 'Al Pacino', 'Robert Duvall', 'James Caan', 'Diane Keaton']
}

imprimeFilme(filmeFavorito);

//4.

function anonimizaPessoa (objeto) {
    novoObjeto = {
        ...objeto,
        nome: 'ANONIMA'
    }
    return novoObjeto;
}

let pessoa = {
    nome: 'Zezinho',
    idade: 30,
    email: 'zezinho@bol.com.br',
    endereco: 'Rua da Coves, 500'
}

let pessoaAnonima = anonimizaPessoa(pessoa);

console.log(pessoa);

console.log(pessoaAnonima);

//Exercícios de Funções de Array

//1. Pode ser usado o while, for e for of.

// let lista = [1, 2, 3, 4];

// i = 0;

// while (i < lista.length) {
//     console.log(lista[i]);
//     i++;
// }

// for (i = 0; i < lista.length; i++) {
//     console.log(lista[i]);
// }

// for (numero of lista) {
//     console.log(numero);
// }

//2. 

function retornaAdultos (array) {
    return array.filter(pessoa => {
        return pessoa.idade >= 20;
    });
}

function retornaJovem (array) {
    return array.filter(pessoa => {
        return pessoa.idade < 20;
    });
}

let listaPessoas = [
    {nome: 'Pedro', idade: 20},
    {nome: 'João', idade: 10},
    {nome: 'Paula', idade: 12},
    {nome: 'Artur', idade: 89}
];

console.log(retornaAdultos(listaPessoas));
console.log(retornaJovem(listaPessoas));

//3. 

function multiplicadosPor2 (array) {
    return array.map(numero => {
        return numero *= 2;
    });
}

function multiplicadosPor3TransformandoString (array) {
    return array.map(numero => {
        return String(numero *= 3);
    })
}

function mostraParidade (array) {
    return array.map(numero => {
        if (numero % 2 === 0) {
            return `${numero} é par`;
        } else {
            return `${numero} é ímpar`;
        }
    })
}

const array = [1, 2, 3, 4, 5, 6];

console.log(multiplicadosPor2(array));

console.log(multiplicadosPor3TransformandoString(array));

console.log(mostraParidade(array));

//4. 

function permiteMontanhaRussa (array) {
    return array.filter(pessoa => {
        return (pessoa.idade > 14 && pessoa.idade < 60 && pessoa.altura >= 1.5);
    });
}

function naoPermiteMontanhaRussa (array) {
    return array.filter(pessoa => {
        return (pessoa.idade <= 14 || pessoa.idade >= 60 || pessoa.altura < 1.5);
    });
}

const pessoas = [
	{nome: "Paula", idade: 12, altura: 1.8},
	{nome: "João", idade: 20, altura: 1.3},
	{nome: "Pedro", idade: 15, altura: 1.9},
	{nome: "Luciano", idade: 22, altura: 1.8},
	{nome: "Artur", idade: 10, altura: 1.2},
	{nome: "Soter", idade: 70, altura: 1.9}
];

console.log(permiteMontanhaRussa(pessoas));

console.log(naoPermiteMontanhaRussa(pessoas));

//5.

function geraTextoEmail (array) {
    let emails = [];
    array.forEach(consulta => {
        let email = 'Olá, ';
        if (consulta.cancelada) {
            if (consulta.genero === 'masculino') {
                email += 'Sr. '
            } else if (consulta.genero === 'feminino') {
                email += 'Sra. ';
            }
            email += `${consulta.nome}. Infelizmente, sua consulta marcada para o dia ${consulta.dataDaConsulta} foi cancelada. Se quiser, pode entrar em contato conosco para remarcá-la.`
        } else {
            if (consulta.genero === 'masculino') {
                email += `Sr. ${consulta.nome}. Estamos enviando esta mensagem para lembrá-lo `;
            } else if (consulta.genero === 'feminino') {
                email += `Sra. ${consulta.nome}. Estamos enviando esta mensagem para lembrá-la `;
            }
            email += `da sua consulta no dia ${consulta.dataDaConsulta}. Por favor, acuse o recebimento deste e-mail.`
        }
        emails.push(email);
    });
    return emails;
}

const consultas = [
	{nome: "João", genero: "masculino", cancelada: true, dataDaConsulta: "01/10/2019" },
	{nome: "Pedro", genero: "masculino", cancelada: false, dataDaConsulta: "02/10/2019" },
	{nome: "Paula", genero: "feminino", cancelada: true, dataDaConsulta: "03/11/2019" },
	{nome: "Márcia", genero: "feminino", cancelada: false, dataDaConsulta: "04/11/2019" }
];

console.log(geraTextoEmail(consultas));

//6.

function atualizaSaldo (array) {
    array.forEach(conta => {
        let totalCompras = 0;
        for (compra of conta.compras) {
            totalCompras += compra;
        }
        conta.saldoTotal -= totalCompras;
    });
    return array;
}

const contas = [
	{ cliente: "João", saldoTotal: 1000, compras: [100, 200, 300] },
	{ cliente: "Paula", saldoTotal: 7500, compras: [200, 1040] },
	{ cliente: "Pedro", saldoTotal: 10000, compras: [5140, 6100, 100, 2000] },
	{ cliente: "Luciano", saldoTotal: 100, compras: [100, 200, 1700] },
	{ cliente: "Artur", saldoTotal: 1800, compras: [200, 300] },
	{ cliente: "Soter", saldoTotal: 1200, compras: [] }
];

console.log(atualizaSaldo(contas));