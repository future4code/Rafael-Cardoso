import React from 'react';
import {
  HeaderContainer,
  BotaoInicialContainer,
  BotaoInicial,
  BotaoListaContainer,
  BotaoLista,
  IconeLista,
  IconeHome,
  Titulo
} from './style';

const Header = (props) => {

  const botao = props.telaInicial ? (
    <BotaoInicialContainer>
      <BotaoInicial
        onClick={props.trocaTela}
      >
        <IconeLista />
      </BotaoInicial>
    </BotaoInicialContainer>
  ) : (
    <BotaoListaContainer>
      <BotaoLista
        onClick={props.trocaTela}
      >
        <IconeHome />
      </BotaoLista>
    </BotaoListaContainer>
  )

  return (
    <HeaderContainer>
      <Titulo>AstroMatch</Titulo>
      {botao}
    </HeaderContainer>
  )
}

export default Header;      