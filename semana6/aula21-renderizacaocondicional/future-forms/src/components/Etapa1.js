import React from 'react';
import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';

class Etapa1 extends React.Component {
  state = {
    valorInputNome: '',
    valorInputIdade: '',
    valorInputEmail: ''
  }

  onChangeInputNome = (event) => {
    this.setState({valorInputNome: event.target.value});
  }

  onChangeInputIdade = (event) => {
    this.setState({valorInputIdade: event.target.value});
  }

  onChangeInputEmail = (event) => {
    this.setState({valorInputEmail: event.target.value});
  }

  render(){
    return(
      <div>
        <h3>ETAPA 1 - DADOS GERAIS</h3>
        <div>
          <PerguntaAberta pergunta={'1. Qual o seu nome?'} value={this.state.valorInputNome} onChange={this.onChangeInputNome} />
          <PerguntaAberta pergunta={'2. Qual sua idade?'} value={this.state.valorInputIdade} onChange={this.onChangeInputIdade} />
          <PerguntaAberta pergunta={'3. Qual seu email?'} value={this.state.valorInputEmail} onChange={this.onChangeInputEmail} />
          <PerguntaOpcoes 
            pergunta={'4. Qual a sua escolaridade?'} 
            opcoes={[
              'Ensino Médio Incompleto',
              'Ensino Médio Completo',
              'Ensino Superior Incompleto',
              'Ensino Superior Completo'
            ]} />
        </div>
      </div>
    );
  }
}

export default Etapa1