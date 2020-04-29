import React from 'react';
import Detalhe from './Detalhe';
import styled from 'styled-components';
import axios from 'axios';

const ListaContainer = styled.div`
`
const ListaNomes = styled.ul`
  padding-left: 0;
`
const Nomes = styled.li`
  display: flex;
  justify-content: space-between;
  width: 180px;
  border-bottom: 1px solid black;
`
const Apaga = styled.p`
  color: red;
  cursor: pointer;
`
class Lista extends React.Component {

  state = {
    listaUsuarios: [],
    listaFiltrada: [],
    usuarioDetalhe: {},
    inputBuscaValue: '',
    detalhe: false,
    filtro: false
  }

  componentDidMount() {
    this.pegaListaUsuarios();
  }

  onChangeInputBusca = (event) => {
    this.setState({ inputBuscaValue: event.target.value })
  }

  pegaListaUsuarios = () => {
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
        this.setState({ listaUsuarios: resposta.data });
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  apagaNome = (id) => {
    if (window.confirm('Tem certeza que deseja deletar?')) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
          {
            headers: {
              Authorization: "rafael-cardoso-julian"
            }
          }
        )
        .then(resposta => {
          window.alert('Apagado com sucesso');
          this.pegaListaUsuarios();
          this.setState({ detalhe: false })
        })
        .catch(error => {
          window.alert('Aconteceu algo errado');
          console.log(error.response);
        })
    }
  }

  pegaUsuarioDetalhe = (id) => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`,
        {
          headers: {
            Authorization: "rafael-cardoso-julian"
          }
        }
      )
      .then(resposta => {
        this.setState({ usuarioDetalhe: resposta.data })
      })
      .catch(error =>{
        console.log(error.response);
      })
  }

  filtraNome = (nome) => {
    if (nome !== '') {
      axios
        .get(
          `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/search?name=${nome}&email=`,
          {
            headers: {
              Authorization: "rafael-cardoso-julian"
            }
          }
        )
        .then(resposta => {
          this.setState({ listaUsuarios: resposta.data })
        })
        .catch(error =>{
          console.log(error.response);
        })
    } else {
      this.pegaListaUsuarios();
    }
  }

  mostraDetalhe = (id) => {
    this.pegaUsuarioDetalhe(id);
    this.mudaTela();
  }

  mudaTela = () => {
    this.setState({ detalhe: !this.state.detalhe })
  }

  render() {
    
    if (this.state.detalhe) {
      return (
        <Detalhe 
          usuario={this.state.usuarioDetalhe}
          mudaTela={this.mudaTela}
          apagaUsuario={this.apagaNome}
          pegaListaUsuarios={this.pegaListaUsuarios}
        />
      )
    } else {
      return (
        <ListaContainer>
          <h4>Usuários cadastrados:</h4>
          <input value={this.state.inputBuscaValue} onChange={this.onChangeInputBusca} />
          <input type='submit' value='Filtrar' onClick={() => this.filtraNome(this.state.inputBuscaValue)} />
          <ListaNomes>
            {this.state.listaUsuarios.map(usuario => {
              return (
                <Nomes key={usuario.id}>
                  <p onClick={() => this.mostraDetalhe(usuario.id)}>{usuario.name}</p>
                  <Apaga onClick={() => this.apagaNome(usuario.id)}>X</Apaga>
                </Nomes>
              )
            })}
          </ListaNomes>
        </ListaContainer>
      )
    }
    
  }
}

export default Lista;