import React from 'react';
import {
  PerfilContainer,
  ImagemContainer, 
  TextoContainer,
  BotoesContainer,
  ImagemPerfil,
  Botao,
  IconeLike,
  IconeDislike
} from './style';

const Perfil = (props) => {

  return (
  <PerfilContainer>
    <ImagemContainer>
      <ImagemPerfil src={props.perfil.photo} alt='Perfil' />
    </ImagemContainer>
    <TextoContainer>
      <h3>{props.perfil.name}, {props.perfil.age}</h3>
      <p>{props.perfil.bio}</p>
    </TextoContainer>
    <BotoesContainer>
      <Botao 
        onClick={() => props.negativo(props.perfil.id)} 
        color='secondary'
      >
        <IconeDislike />
      </Botao>
      <Botao 
        onClick={() => props.positivo(props.perfil.id)} 
        color='primary'
      >
        <IconeLike />
      </Botao>
    </BotoesContainer>
  </PerfilContainer>
  )
}

export default Perfil;