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

const Aviso = styled.p`
  color: red;
`

class PerguntaAberta extends React.Component {
  render(){
    return(
      <InputContainer>
        <Label>{this.props.pergunta}</Label>
        <input value={this.props.value} onChange={this.props.onChange} />
        <Aviso>{this.props.aviso}</Aviso>
      </InputContainer>
    );
  }
}

export default PerguntaAberta;