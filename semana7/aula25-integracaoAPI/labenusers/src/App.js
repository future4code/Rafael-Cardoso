import React from 'react';
import './App.css';
import Form from './components/Form';
import Lista from './components/Lista';
import styled from 'styled-components';
import axios from 'axios';

const AppContainer = styled.div`
  width: 90%;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const BotaoTela = styled.input`
  align-self: flex-end;
`

class App extends React.Component {

  state = {
    listaNomes: [],
    inputNomeValue: '',
    inputEmailValue: '',
    listaUsuarios: false
  }

  componentDidMount() {
    this.pegaListaNomes();
  }

  pegaListaNomes = () => {
    axios
      .get(
        'https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users',
        {
          headers: {
            Authorization: "rafael-cardoso-julian"
          }
        }
      )
      .then(resposta => {
        this.setState({ listaNomes: resposta.data });
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  onChangeInputNome = (event) => {
    this.setState({ inputNomeValue: event.target.value });
  }

  onChangeInputEmail = (event) => {
    this.setState({ inputEmailValue: event.target.value });
  }

  enviaDados = () => {
    const body = {
      "name": this.state.inputNomeValue,
      "email": this.state.inputEmailValue
    }
    axios
      .post(
        'https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users',
        body,
        {
          headers: {
            Authorization: "rafael-cardoso-julian"
          }
        }
      )
      .then(resposta => {
        alert('Incluído com sucesso');
        this.pegaListaNomes();
      })
      .catch(error => {
        alert('Aconteceu algo errado');
        console.log(error.response);
      });
    this.setState({ inputNomeValue: '', inputEmailValue: '' })
  }

  apagaNome = (id) => {
    axios
      .delete(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        {
          headers: {
            Authorization: "rafael-cardoso-julian"
          }
        }
      )
      .then(reposta => {
        alert('Apagado com sucesso');
        this.pegaListaNomes();
      })
      .catch(error => {
        alert('Aconteceu algo errado');
        console.log(error.response);
      })
  }

  renderizaTela = () => {
    if (this.state.listaUsuarios) {
      return (
        <Lista 
          listaNomes={this.state.listaNomes}
          onClickApaga={this.apagaNome}
        />
      );
    }
    return (
      <Form 
        nomeValue={this.state.inputNomeValue}
        emailValue={this.state.inputEmailValue}
        onChangeNome={this.onChangeInputNome}
        onChangeEmail={this.onChangeInputEmail}
        onClickEnvia={this.enviaDados}
      />
    );
  }

  mostraBotao = () => {
    return <BotaoTela type='submit' value={this.state.listaUsuarios ? 'Tela de cadastro' : 'Lista de nomes'} onClick={this.mudaTela} />
  }

  mudaTela = () => {
    this.setState({ listaUsuarios: !this.state.listaUsuarios});
  }

  render() {

    return (
      <AppContainer>
        {this.mostraBotao()}
        {this.renderizaTela()}
      </AppContainer>
    );
  }
}

export default App;
