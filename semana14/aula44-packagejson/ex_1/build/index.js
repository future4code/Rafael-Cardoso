"use strict";
const nome = process.argv[2];
const idade = Number(process.argv[3]);
if (!nome && !idade) {
    console.log('Favor informe um nome e uma idade.');
}
else if (!idade) {
    console.log('Um parâmetro está faltando.');
}
else {
    console.log(`Olá, ${nome}! Você tem ${idade} anos.`);
    console.log(`Olá, ${nome}! Você tem ${idade} anos. Em sete anos você terá ${idade + 7} anos.`);
}
//# sourceMappingURL=index.js.map