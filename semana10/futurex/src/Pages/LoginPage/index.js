import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  LoginPageContainer,
  FormContainer,
  LoginTextField,
  LoginFormControl,
  LoginButton
} from './style';
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
      props.setToken(response.data.token);
      props.setLogado(true);
      history.push('/trips/list');
    })
    .catch(error => {
      console.log(error);
      window.alert('Não foi possível acessar')
    })
  }

  return (
    <LoginPageContainer>
      <FormContainer>
        <LoginFormControl>
          <LoginTextField 
            value={email}
            onChange={event => setEmail(event.target.value)}
            label={'Email'}
          />
        </LoginFormControl>
        <LoginFormControl>
          <LoginTextField 
            value={password}
            onChange={event => setPassword(event.target.value)}
            label={'Password'}
            type={'password'}
          />
        </LoginFormControl>
        <LoginButton onClick={goToPrivateArea} >Entrar</LoginButton>
      </FormContainer>
    </LoginPageContainer>
  )
}

export default LoginPage