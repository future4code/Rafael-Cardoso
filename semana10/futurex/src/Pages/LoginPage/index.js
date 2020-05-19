import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  LoginPageContainer,
} from './style';
import axios from 'axios';

const LoginPage = (props) => {

  const history = useHistory();

  const goToPrivateArea = () => {
    history.push('/trips/list');
  }

  return (
    <LoginPageContainer>
      <Header />
      LoginPage
      <button onClick={goToPrivateArea} >Entrar</button>
      <Footer />
    </LoginPageContainer>
  )
}

export default LoginPage