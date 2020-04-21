import React from 'react';
import styled from 'styled-components';

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: .5em;
`

const Label = styled.label`
  padding: .5em;
`

class PerguntaOpcoes extends React.Component {
  render(){
    return(
      <InputContainer>
        <Label>{this.props.pergunta}</Label>
        <select value={this.props.value} onChange={this.props.onChange}>
            {this.props.opcoes.map((opcao, idx) => {
                return <option key={idx} value={opcao}>{opcao}</option>
            })}
        </select>
      </InputContainer>
    );
  }
}

export default PerguntaOpcoes;