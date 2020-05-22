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

const Header = (props) => {

  const history = useHistory();

  const goToHomePage = () => {
    history.push('/');
  }

  const goToLoginPage = () => {
    history.push('/login');
  }

  const headerContent = props.logado ? (
    <NavMenu setLogado={props.setLogado} setToken={props.setToken} />
  ) : (
    <HeaderButton onClick={goToLoginPage} >Clique para logar</HeaderButton>
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