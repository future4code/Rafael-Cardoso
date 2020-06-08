import React from 'react';
import {
  FooterContainer,
  BotaoContainer,
  Botao
} from './style';
import axios from 'axios';

const BotaoLimpar = (props) => {

  const limpaMatches = () => {
    const body = {
      'id': 'PatusZf4mHH6UoZfYC8I'
    }
    axios.put(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${props.aluno}/clear`, body)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error)
      })
    props.setTelaInicial(true);
  }

  return (
    <FooterContainer>
      <BotaoContainer>
        <Botao onClick={limpaMatches} >Limpar Matches</Botao>
      </BotaoContainer>
    </FooterContainer>
  )
}

export default BotaoLimpar