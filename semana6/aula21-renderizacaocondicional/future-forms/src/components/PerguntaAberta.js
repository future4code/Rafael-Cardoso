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

class PerguntaAberta extends React.Component {
  render(){
    return(
      <InputContainer>
        <Label>{this.props.pergunta}</Label>
        <input value={this.props.value} onChange={this.props.onChange} />
      </InputContainer>
    );
  }
}

export default PerguntaAberta