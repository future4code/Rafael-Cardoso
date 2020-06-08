import styled from 'styled-components';
import {
  IconButton
} from '@material-ui/core/';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';

export const HeaderContainer = styled.div`
  height: 80px;
  display: grid;
  grid-template-columns: 1fr 80% 1fr;
  grid-template-rows: 1fr;
`
export const BotaoInicialContainer = styled.div`
  grid-column: 3 / span 1;
  grid-row: 1 / span 1;
  display: flex;
  align-items: center;
`
export const BotaoInicial = styled(IconButton)`
`
export const BotaoListaContainer = styled.div`
  grid-column: 1 / span 1;
  grid-row: 1 / span 1;
  display: flex;
  align-items: center;
`
export const BotaoLista = styled(IconButton)`
`
export const IconeLista = styled(PeopleIcon)``

export const IconeHome = styled(HomeIcon)``

export const Titulo = styled.p`
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
  display: flex;
  justify-content: center;
  align-items: center;
`