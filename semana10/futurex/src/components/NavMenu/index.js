import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  NavMenuContainer
} from './style';

const NavMenu = (props) => {

  const history = useHistory();

  const goToListTripsPage = () => {
    history.push('/trips/list');
  }

  const goToCreateTripPage = () => {
    history.push('/trips/create');
  }
  
  return (
    <NavMenuContainer>
      NavMenu
      <p onClick={goToListTripsPage} >Lista de viagens</p>
      <p onClick={goToCreateTripPage} >Crie uma viagem</p>
    </NavMenuContainer>
  )
}

export default NavMenu;