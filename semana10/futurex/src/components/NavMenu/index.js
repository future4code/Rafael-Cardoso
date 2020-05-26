import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  NavMenuContainer,
  MenuButton
} from './style';

const NavMenu = () => {

  const history = useHistory();

  const goToListTripsPage = () => {
    history.push('/trips/list');
  }

  const goToCreateTripPage = () => {
    history.push('/trips/create');
  }

  const logingOut = () => {
    window.localStorage.clear();
    history.push('/');
  }
  
  return (
    <NavMenuContainer>
      <MenuButton onClick={goToListTripsPage} >Lista de viagens</MenuButton>
      <MenuButton onClick={goToCreateTripPage} >Crie uma viagem</MenuButton>
      <MenuButton onClick={logingOut} >Deslogar</MenuButton>
    </NavMenuContainer>
  )
}

export default NavMenu;