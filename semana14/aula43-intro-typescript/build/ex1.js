const minhaString = 'eu';
console.log(minhaString);
const meuNumero = 2;
console.log(meuNumero);
var CoresArcoIris;
(function (CoresArcoIris) {
    CoresArcoIris["VERMELHO"] = "Vermelho";
    CoresArcoIris["LARANJA"] = "Laranja";
    CoresArcoIris["AMARELO"] = "Amarelo";
    CoresArcoIris["VERDE"] = "Verde";
    CoresArcoIris["AZUL"] = "Azul";
    CoresArcoIris["ANIL"] = "Anil";
    CoresArcoIris["VIOLETA"] = "Violeta";
})(CoresArcoIris || (CoresArcoIris = {}));
const jony = {
    nome: 'Jony',
    idade: 22,
    corFavorita: CoresArcoIris.AZUL
};
const maria = {
    nome: 'Maria',
    idade: 30,
    corFavorita: CoresArcoIris.VIOLETA
};
const antonio = {
    nome: 'Antonio',
    idade: 40,
    corFavorita: CoresArcoIris.AMARELO
};
const joana = {
    nome: 'Joana',
    idade: 53,
    corFavorita: CoresArcoIris.LARANJA
};
console.log(jony, maria, antonio, joana);
//# sourceMappingURL=ex1.js.map