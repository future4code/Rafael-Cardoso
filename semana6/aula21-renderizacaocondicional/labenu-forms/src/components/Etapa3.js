import React from 'react';
import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';

class Etapa3 extends React.Component {

  render(){
    return(
      <div>
        <h3>ETAPA 3 - INFORMAÇÕES GERAIS DE ENSINO</h3>
        <div>
          <PerguntaAberta 
            pergunta={'7. Por que você não terminou um curso de graduação?'} 
            value={this.props.valorInputMotivo} 
            onChange={this.props.onChangeInputMotivo} 
            aviso={this.props.avisoInputMotivo}
          />
          <PerguntaOpcoes 
            pergunta={'8. Você fez algum curso complementar?'} 
            value={this.props.valorSelectCursoComplementar}
            onChange={this.props.onChangeSelectCursoComplementar}
            opcoes={[
              'Nenhum',
              'Curso Técnico',
              'Curso de Inglês'
            ]} 
          />
        </div>
      </div>
    );
  }
}

export default Etapa3