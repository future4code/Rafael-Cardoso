/*
Exercícios de interpretação de código

Respostas do exercício 1

a. false
b. true
c. false
d. false
e. boolean

Respostas do exercício 2

a. array é uma lista de objetos, como números, strings.
b. 0
c. pode-se usar o comando array.length
d. 
  I. undefined
  II. null
  III. 11
  IV. 3 e 4
  V. 19 e 9
  VI. 3
  VII. 1

*/

//Exercícios de escrita de código

//1.
let tempFahrenheit = 77;

let tempFahrenheitParaKelvin = (tempFahrenheit - 32) * 5 / 9 + 273.15;

console.log(tempFahrenheit + '°F = ' + tempFahrenheitParaKelvin + 'K');

let tempCelsius = 80;

let tempCelsiusParaFahrenheit = tempCelsius * 9 / 5 + 32;

console.log(tempCelsius + '°C = ' + tempCelsiusParaFahrenheit + '°F');

tempCelsius = 30;

tempCelsiusParaFahrenheit = tempCelsius * 9 / 5 + 32;

console.log(tempCelsius + '°C = ' + tempCelsiusParaFahrenheit + '°F');

let tempCelsiusParaKelvin = tempCelsius + 273.15;

console.log(tempCelsius + '°C = ' + tempCelsiusParaKelvin + 'K');

//2. 

const perguntas = [];
perguntas[0] = 'Qual sua cor favorita?';

perguntas[1] = 'Qual time você torce?';

perguntas[2] = 'Prefere gato ou cachorro?';

perguntas[3] = 'Biscoito ou bolacha?';

perguntas[4] = 'Qual o significado da vida, do universo e tudo mais?'

const respostas = [];
respostas[0] = prompt(perguntas[0]);

console.log('1. ' + perguntas[0] + '\n' + 'Resposta: ' + respostas[0]);

respostas[1] = prompt(perguntas[1]);

console.log('2. ' + perguntas[1] + '\n' + 'Resposta: ' + respostas[1]);

respostas[2] = prompt(perguntas[2]);

console.log('3. ' + perguntas[2] + '\n' + 'Resposta: ' + respostas[2]);

respostas[3] = prompt(perguntas[3]);

console.log('4. ' + perguntas[3] + '\n' + 'Resposta: ' + respostas[3]);

respostas[4] = prompt(perguntas[4]);

console.log('5. ' + perguntas[4] + '\n' + 'Resposta: ' + respostas[4]);

//3. 

let consumo = 280;

let conta = consumo * .05;

console.log('A conta para ' + consumo + 'kWh é R$' + conta);

let desconto = 15;

conta *= (1 - desconto / 100);

console.log('Agora com ' + desconto + '% de desconto fica R$' + conta);

//Desafios

//1.a.

let massaLibra = 20;

let massaLibraParaKg = .45359 * massaLibra;

console.log(massaLibra + 'lb equivalem a ' + massaLibraParaKg + 'kg');

//b.

let massaOnça = 10.5;

let massaOnçaParaKg = .02835 * massaOnça;

console.log(massaOnça + 'oz equivalem a ' + massaOnçaParaKg + 'kg');

//c. 

let comprimentoMilha = 100;

let comprimentoMilhaParaMetro = comprimentoMilha * 1609.344;

console.log(comprimentoMilha + 'mi equivalem a ' + comprimentoMilhaParaMetro + 'm');

//d.

let comprimentoPe = 50;

let comprimentoPeParaMetro = comprimentoPe * .3048;

console.log(comprimentoPe + 'ft equivalem a ' + comprimentoPeParaMetro + 'm');

//e. 

let volumeGalao = 103.56;

let volumeGalaoParaLitro = volumeGalao * 3.78541;

console.log(volumeGalao + 'gal equivalem a ' + volumeGalaoParaLitro + 'l');

//f. 

let volumeXicara = 450;

let volumeXicaraParaLitro = volumeXicara * .2366;

console.log(volumeXicara + 'xic equivalem a ' + volumeXicaraParaLitro + 'l');

//g. 

massaLibra = prompt('Qual a massa em lb que você quer converter para kg?');

massaLibraParaKg = .45359 * massaLibra;

console.log(massaLibra + 'lb equivalem a ' + massaLibraParaKg + 'kg');

massaOnça = prompt('Qual a massa em oz que você quer converter para kg?');

massaOnçaParaKg = .02835 * massaOnça;

console.log(massaOnça + 'oz equivalem a ' + massaOnçaParaKg + 'kg');

comprimentoMilha = prompt('Qual o comprimento em mi que você quer converter para m?');

comprimentoMilhaParaMetro = comprimentoMilha * 1609.344;

console.log(comprimentoMilha + 'mi equivalem a ' + comprimentoMilhaParaMetro + 'm');

comprimentoPe = prompt('Qual o comprimento em ft que você quer converter para m?');

comprimentoPeParaMetro = comprimentoPe * .3048;

console.log(comprimentoPe + 'ft equivalem a ' + comprimentoPeParaMetro + 'm');

volumeGalao = prompt('Qual o volume em gal que você quer converter para l?');

volumeGalaoParaLitro = volumeGalao * 3.78541;

console.log(volumeGalao + 'gal equivalem a ' + volumeGalaoParaLitro + 'l');

volumeXicara = prompt('Qual o volume em xic que você quer converter para l?');

volumeXicaraParaLitro = volumeXicara * .2366;

console.log(volumeXicara + 'xic equivalem a ' + volumeXicaraParaLitro + 'l');