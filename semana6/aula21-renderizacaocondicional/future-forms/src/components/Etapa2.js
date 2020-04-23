import React from 'react';
import PerguntaAberta from './PerguntaAberta';

class Etapa2 extends React.Component {
  state = {
    valorInputCurso: '',
    valorInputUnidadeEnsino: ''
  }

  onChangeInputCurso = (event) => {
    this.setState({valorInputCurso: event.target.value});
  }

  onChangeInputUnidadeEnsino = (event) => {
    this.setState({valorInputUnidadeEnsino: event.target.value});
  }
  
  render(){
    return(
      <div>
        <h3>ETAPA 2 - INFORMAÇÕES DO ENSINO SUPERIOR</h3>
        <div>
          <PerguntaAberta pergunta={'5. Qual curso?'} value={this.state.valorInputCurso} onChange={this.onChangeInputCurso} />
          <PerguntaAberta pergunta={'6. Qual a unidade de ensino?'} value={this.state.valorInputUnidadeEnsino} onChange={this.onChangeInputUnidadeEnsino} />
        </div>
      </div>
    );
  }
}

export default Etapa2