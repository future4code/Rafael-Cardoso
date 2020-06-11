import React from 'react';
import logo from '../../img/futurex.png';
import { useHistory } from 'react-router-dom';
import NavMenu from '../NavMenu';
import {
  HeaderContainer,
  HeaderSubContainer,
  HeaderContentContainer,
  Image,
  HeaderButton
} from './style';

const Header = () => {

  const history = useHistory();

  const token = window.localStorage.getItem('token');

  const goToHomePage = () => {
    history.push('/');
  }

  const goToLoginPage = () => {
    history.push('/login');
  }
  
  const headerContent = token ? (
    <NavMenu />
  ) : (
    <HeaderButton onClick={goToLoginPage} >Login</HeaderButton>
  )
  
  return (
    <HeaderContainer>
      <HeaderSubContainer>
        <HeaderButton onClick={goToHomePage} >
          <Image src={logo} alt='logo' />
        </HeaderButton>
        <HeaderContentContainer>
          {headerContent}
        </HeaderContentContainer>
      </HeaderSubContainer>
    </HeaderContainer>
  )
}

export default Header;