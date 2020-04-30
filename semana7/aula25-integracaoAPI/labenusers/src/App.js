import React from 'react';
import './App.css';
import Form from './components/Form';
import Lista from './components/Lista';
import styled from 'styled-components';

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
    exibirListaUsuarios: false
  }

  renderizaTela = () => {
    return this.state.exibirListaUsuarios ? <Lista /> : <Form />
  }

  mostraBotao = () => {
    return <BotaoTela type='submit' value={this.state.exibirListaUsuarios ? 'Tela de cadastro' : 'Lista de nomes'} onClick={this.mudaTela} />
  }

  mudaTela = () => {
    this.setState({exibirListaUsuarios: !this.state.exibirListaUsuarios});
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
