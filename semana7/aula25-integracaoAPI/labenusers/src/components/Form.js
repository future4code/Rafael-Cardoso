import React from 'react';
import styled from 'styled-components';

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

  render() {
    return (
      <div>
        <FormContainer>
          <InputContainer>
            <label htmlFor='nome'>Nome: </label>
            <input id='nome' value={this.props.nomeValue} onChange={this.props.onChangeNome} />
          </InputContainer>
          <InputContainer>
            <label htmlFor='email'>Email: </label>
            <input id='email' value={this.props.emailValue} onChange={this.props.onChangeEmail} />
          </InputContainer>
          <BotaoContainer>
            <BotaoInput type='submit' value='Salvar' onClick={this.props.onClickEnvia} />
          </BotaoContainer>
        </FormContainer>
      </div>
    )
  }
}

export default Form;