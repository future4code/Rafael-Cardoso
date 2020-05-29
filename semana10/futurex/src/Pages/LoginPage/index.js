import React from 'react';
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
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

const LoginPage = (props) => {

  const { form, onChange, resetForm } = useForm({
    email: '',
    password: ''
  })

  const { email, password } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  }

  const history = useHistory();

  const goToPrivateArea = (event) => {
    event.preventDefault();
    const body = {
      'email': email,
      'password': password
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/login`, body)
    .then(response => {
      window.localStorage.setItem('token', response.data.token);
      history.push('/trips/list');
      resetForm();
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
        <FormContainer onSubmit={goToPrivateArea} >
          <LoginFormControl>
            <LoginTextField 
              name='email'
              value={email}
              onChange={handleInputChange}
              label={'Email'}
              type='email'
              required
            />
          </LoginFormControl>
          <LoginFormControl>
            <LoginTextField 
              name='password'
              value={password}
              onChange={handleInputChange}
              label={'Password'}
              type='password'
              required
            />
          </LoginFormControl>
          <LoginButton type='submit' >Entrar</LoginButton>
        </FormContainer>
      </LoginPageContainer>
      <Footer />
    </PageContainer>
  )
}

export default LoginPage