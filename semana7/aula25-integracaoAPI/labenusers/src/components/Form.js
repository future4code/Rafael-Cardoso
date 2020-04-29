import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
`

const InputContainer = styled.div`
  margin: 1em;
`
const BotaoContainer = styled.div`
  align-self: flex-end;
  margin: 1em;
`
const BotaoInput = styled.input`
  cursor: pointer;
`

class Form extends React.Component {
  state = {
    inputNomeValue: '',
    inputEmailValue: '',
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
        window.alert('Incluído com sucesso');
      })
      .catch(error => {
        window.alert('Aconteceu algo errado');
        console.log(error.response);
      });
    this.setState({ inputNomeValue: '', inputEmailValue: '' })
  }

  onChangeInputNome = (event) => {
    this.setState({ inputNomeValue: event.target.value });
  }

  onChangeInputEmail = (event) => {
    this.setState({ inputEmailValue: event.target.value });
  }

  render() {
    return (
      <div>
        <FormContainer>
          <InputContainer>
            <label htmlFor='nome'>Nome: </label>
            <input id='nome' value={this.state.inputNomeValue} onChange={this.onChangeInputNome} />
          </InputContainer>
          <InputContainer>
            <label htmlFor='email'>Email: </label>
            <input id='email' value={this.state.inputEmailValue} onChange={this.onChangeInputEmail} />
          </InputContainer>
          <BotaoContainer>
            <BotaoInput type='submit' value='Salvar' onClick={this.enviaDados} />
          </BotaoContainer>
        </FormContainer>
      </div>
    )
  }
}

export default Form;