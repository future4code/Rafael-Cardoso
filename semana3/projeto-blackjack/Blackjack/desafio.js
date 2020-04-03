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
  let cartasUsuario = [];
  let cartasComputador = [];
  let cartaUsuario = '';
  let cartaComputador = '';
  let pontuacaoUsuario = 0;
  let pontuacaoComputador = 0;

  for (let i = 0; i < 2; i++) {

    cartasUsuario.push(comprarCarta());
    cartasComputador.push(comprarCarta());
    cartaUsuario += ' ' + cartasUsuario[i].texto;
    cartaComputador += ' ' + cartasComputador[i].texto;
    pontuacaoUsuario += cartasUsuario[i].valor;
    pontuacaoComputador += cartasComputador[i].valor;
  }

  while (pontuacaoUsuario === 22) {

    cartasUsuario = [];
    cartaUsuario = '';
    pontuacaoUsuario = 0;
    for (let i = 0; i < 2; i++){

      cartasUsuario.push(comprarCarta());
      cartaUsuario += ' ' + cartasUsuario[i].texto;
      pontuacaoUsuario += cartasUsuario[i].valor;
    }
  }

  while (pontuacaoComputador === 22) {

    cartasComputador = [];
    cartaComputador = '';
    pontuacaoComputador = 0;
    for (let i = 0; i < 2; i++) {

      cartasComputador.push(comprarCarta());
      cartaComputador += ' ' + cartasComputador[i].texto;
      pontuacaoComputador += cartasComputador[i].valor;
    }
  }

  let confirmacao = true;

  while (confirmacao && pontuacaoUsuario <= 21) {

    confirmacao = confirm('Suas cartas são' + cartaUsuario + '. A carta revelada do computador é ' + cartasComputador[0].texto
     + '.\n' + 'Deseja comprar uma carta?');
    if (confirmacao) {

      const cartaCompradaUsuario = comprarCarta();
      cartasUsuario.push(cartaCompradaUsuario);
      cartaUsuario += ' ' + cartaCompradaUsuario.texto;
      pontuacaoUsuario += cartaCompradaUsuario.valor;
    }
  }

  if (!confirmacao && pontuacaoUsuario <= 21) {

    while (pontuacaoComputador < pontuacaoUsuario) {
      const cartaCompradaComputador = comprarCarta();
      cartasComputador.push(cartaCompradaComputador);
      cartaComputador += ' ' + cartaCompradaComputador.texto;
      pontuacaoComputador += cartaCompradaComputador.valor;
    }
  }

  let mensagem = 'Suas cartas são' + cartaUsuario + '. Sua pontuação é ' + pontuacaoUsuario + '.\n';
  mensagem += 'As cartas do computador são' + cartaComputador + '. A pontuação do computador é ' + pontuacaoComputador + '.\n';

  if (pontuacaoUsuario > 21) {
    mensagem += 'O computador ganhou!';
  } else if (pontuacaoComputador > 21 || pontuacaoUsuario > pontuacaoComputador) {
    mensagem += 'O usuário ganhou!';
  } else if (pontuacaoUsuario === pontuacaoComputador) {
    mensagem += 'Empate!';
  } else {
    mensagem += 'O computador ganhou!';
  }

  alert(mensagem);
  
} else {
console.log('O jogo acabou.');
}