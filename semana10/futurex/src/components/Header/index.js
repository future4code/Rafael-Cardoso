import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  HeaderContainer
} from './style';

const Header = (props) => {

  const history = useHistory();

  const goToHomePage = () => {
    history.push('/');
  }

  const goToLoginPage = () => {
    history.push('/login');
  }
  
  return (
    <HeaderContainer>
      Header
      <h3 onClick={goToHomePage} >FutureX</h3>
      <button onClick={goToLoginPage} >Clique para logar</button>
    </HeaderContainer>
  )
}

export default Header;