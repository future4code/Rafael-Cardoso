import React from 'react';
import PerguntaAberta from './PerguntaAberta';

class Etapa2 extends React.Component {

  render(){
    return(
      <div>
        <h3>ETAPA 2 - INFORMAÇÕES DO ENSINO SUPERIOR</h3>
        <div>
          <PerguntaAberta 
            pergunta={'5. Qual curso?'} 
            value={this.props.valorInputCurso} 
            onChange={this.props.onChangeInputCurso} 
            aviso={this.props.avisoInputCurso}
          />
          <PerguntaAberta 
            pergunta={'6. Qual a unidade de ensino?'} 
            value={this.props.valorInputUnidadeEnsino} 
            onChange={this.props.onChangeInputUnidadeEnsino} 
            aviso={this.props.avisoInputUnidadeEnsino}
          />
        </div>
      </div>
    );
  }
}

export default Etapa2;