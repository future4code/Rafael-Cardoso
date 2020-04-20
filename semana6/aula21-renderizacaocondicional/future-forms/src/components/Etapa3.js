import React from 'react';
import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';

class Etapa3 extends React.Component {
  state = {
    valorInputMotivo: ''
  }

  onChangeInputMotivo = (event) => {
    this.setState({valorInputMotivo: event.target.value});
  }
  
  render(){
    return(
      <div>
        <h3>ETAPA 3 - INFORMAÇÕES GERAIS DE ENSINO</h3>
        <div>
          <PerguntaAberta pergunta={'7. Por que você não terminou um curso de graduação?'} value={this.state.valorInputMotivo} onChange={this.onChangeInputMotivo} />
          <PerguntaOpcoes 
            pergunta={'8. Você fez algum curso complementar?'} 
            opcoes={[
              'Nenhum',
              'Curso Técnico',
              'Curso de Inglês'
            ]} />
        </div>
      </div>
    );
  }
}

export default Etapa3