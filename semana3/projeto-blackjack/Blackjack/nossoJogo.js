/**
* EXEMPLO DE UTILIZAÇÃO DA 'comprarCarta'
* 
* 
  const carta = comprarCarta(); // Sorteia uma carta. Por exemplo, o rei de ouros
      
  console.log(carta.texto) // imprime o texto da carta. Exemplo: "K♦️" (indica "K" de ouros)
  console.log(carta.valor) // imprime o valor da carta (um número). Exemplo: 10 (dado que "K" vale 10)
* 
* 
* 
*/

console.log('Bem vindo ao jogo de Blackjack!');
if (confirm('Quer iniciar uma nova rodada?')) {
  const cartasUsuario = [];
  const cartasComputador = [];
  let cartaUsuario = '';
  let cartaComputador = '';
  let pontuacaoUsuario = 0;
  let pontuacaoComputador = 0;
  for (let i = 0; i < 2; i++) {
    cartasUsuario[i] = comprarCarta();
    cartasComputador[i] = comprarCarta();
    cartaUsuario += ' ' + cartasUsuario[i].texto;
    cartaComputador += ' ' + cartasComputador[i].texto;
    pontuacaoUsuario += cartasUsuario[i].valor;
    pontuacaoComputador += cartasComputador[i].valor;
  }
  console.log('Usuário - cartas:' + cartaUsuario + ' - pontuação ' + pontuacaoUsuario);
  console.log('Computador - cartas:' + cartaComputador + ' - pontuação ' + pontuacaoComputador);
  if (pontuacaoUsuario > 21 && pontuacaoComputador > 21) {
    console.log('Empate!');
  } else if (pontuacaoComputador > 21) {
    console.log('O usuário ganhou!');
  } else if (pontuacaoUsuario > 21) {
    console.log('O computador ganhou!');
  } else if (pontuacaoUsuario > pontuacaoComputador) {
    console.log('O usuário ganhou!');
  } else if (pontuacaoUsuario < pontuacaoComputador) {
    console.log('O computador ganhou!');
  } else {
    console.log('Empate!');
  }
} else {
console.log('O jogo acabou.');
}