import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  PageContainer,
  LoginPageContainer,
  FormContainer,
  LoginTextField,
  LoginFormControl,
  LoginButton
} from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';

const LoginPage = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const goToPrivateArea = () => {
    const body = {
      'email': email,
      'password': password
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/login`, body)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      history.push('/trips/list');
    })
    .catch(error => {
      console.log(error);
      window.alert('Não foi possível acessar')
    })
  }

  return (
    <PageContainer>
      <Header />
      <LoginPageContainer>
        <FormContainer>
          <LoginFormControl>
            <LoginTextField 
              value={email}
              onChange={event => setEmail(event.target.value)}
              label={'Email'}
              type='email'
            />
          </LoginFormControl>
          <LoginFormControl>
            <LoginTextField 
              value={password}
              onChange={event => setPassword(event.target.value)}
              label={'Password'}
              type='password'
            />
          </LoginFormControl>
          <LoginButton onClick={goToPrivateArea} >Entrar</LoginButton>
        </FormContainer>
      </LoginPageContainer>
      <Footer />
    </PageContainer>
  )
}

export default LoginPage