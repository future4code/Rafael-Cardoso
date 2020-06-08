import styled from 'styled-components';
import {
  IconButton
} from '@material-ui/core/';
import NotInsterestedIcon from '@material-ui/icons/NotInterested';
import FavoriteIcon from '@material-ui/icons/Favorite';

export const PerfilContainer = styled.div`
  max-height: 540px;
`
export const ImagemContainer = styled.div`
  width: 100%;
  max-height: 380px;
  overflow: hidden;
`
export const ImagemPerfil = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`
export const TextoContainer = styled.div`
  height: 100px;
`
export const BotoesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
`
export const Botao = styled(IconButton)``

export const IconeLike = styled(FavoriteIcon)``

export const IconeDislike = styled(NotInsterestedIcon)``
