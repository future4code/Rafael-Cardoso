import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainerEdicao = styled.div`
  display: flex;
  flex-direction: column;
`

class Detalhe extends React.Component {

  state = {
    inputNovoNomeValue: '',
    inputNovoEmailValue: '',
    edicao: false
  }

  onChangeNovoNome = (event) => {
    this.setState({ inputNovoNomeValue: event.target.value });
  }

  onChangeNovoEmail = (event) => {
    this.setState({ inputNovoEmailValue: event.target.value });
  }

  salvaEdicao = (id) => {
    const body = {
      "name": this.state.inputNovoNomeValue,
      "email": this.state.inputNovoEmailValue
    }
    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        body,
        {
          headers: {
            Authorization: "rafael-cardoso-julian"
          }
        }
      )
      .then(resposta => {
        window.alert('Alterado com sucesso');
        this.props.pegaListaUsuarios();
        this.props.mudaTela();
      })
      .catch(error => {
        window.alert('Aconteceu algo errado');
        console.log(error.response);
      });

  }

  mostraFormEdicao = (id) => {
    if (this.state.edicao) {
      return (
        <FormContainerEdicao>
          <input value={this.state.inputNovoNomeValue} onChange={this.onChangeNovoNome} placeholder={'Novo Nome'} />
          <input value={this.state.inputNovoEmailValue} onChange={this.onChangeNovoEmail} placeholder={'Novo Email'} />
          <button onClick={() => this.salvaEdicao(id)} >Salvar</button>
        </FormContainerEdicao>
      )
    } else {
      return <button onClick={this.mudaEdicao}>Editar</button>
    }
  }

  mudaEdicao = () => {
    this.setState({ edicao: !this.state.edicao });
  }

  render() {
    return (
      <div>
        <button onClick={this.props.mudaTela} >Voltar</button>
        <div>
          <p>{this.props.usuario.name}</p>
          <p>{this.props.usuario.email}</p>
          {this.mostraFormEdicao(this.props.usuario.id)}
          <button onClick={() => this.props.apagaUsuario(this.props.usuario.id)}>Apagar usuário</button>
        </div>
      </div>
    )
  }
}

export default Detalhe;