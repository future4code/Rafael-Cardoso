import React from 'react';
import styled from 'styled-components';

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

  render() {
    return (
      <ListaContainer>
        <h4>Usuários cadastrados:</h4>
        <ListaNomes>
          {this.props.listaNomes.map(nome => {
            return (
              <Nomes key={nome.id}>
                <p>{nome.name}</p>
                <Apaga onClick={() => this.props.onClickApaga(nome.id)}>X</Apaga>
              </Nomes>
            )
          })}
        </ListaNomes>
      </ListaContainer>
    )
  }
}

export default Lista;