import React from 'react';
import {
  ListaContainer,
  PerfilContainer,
  ImagemContainer,
  ImagemPerfil
} from './style';

const ListaMatches = (props) => {
  
  return (
    <ListaContainer>
      {props.lista.map(match => {
        return (
          <PerfilContainer key={match.id}>
            <ImagemContainer>
              <ImagemPerfil src={match.photo} alt={'Perfil'} />
            </ImagemContainer>
            <p>{match.name}</p>
          </PerfilContainer>
        )
      })}
    </ListaContainer>
  )
}
  
export default ListaMatches;