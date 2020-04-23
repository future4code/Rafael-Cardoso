import React from 'react';
import PerguntaAberta from './PerguntaAberta';
import PerguntaOpcoes from './PerguntaOpcoes';

class Etapa1 extends React.Component {

  render(){
    return(
      <div>
        <h3>ETAPA 1 - DADOS GERAIS</h3>
        <div>
          <PerguntaAberta 
            pergunta={'1. Qual o seu nome?'} 
            value={this.props.valorInputNome} 
            onChange={this.props.onChangeInputNome} 
            aviso={this.props.avisoInputNome}
          />
          <PerguntaAberta 
            pergunta={'2. Qual sua idade?'} 
            value={this.props.valorInputIdade} 
            onChange={this.props.onChangeInputIdade} 
            aviso={this.props.avisoInputIdade}
          />
          <PerguntaAberta 
            pergunta={'3. Qual seu email?'} 
            value={this.props.valorInputEmail} 
            onChange={this.props.onChangeInputEmail} 
            aviso={this.props.avisoInputEmail}
          />
          <PerguntaOpcoes 
            pergunta={'4. Qual a sua escolaridade?'} 
            value={this.props.valorSelectEscolaridade} 
            onChange={this.props.onChangeSelectEscolaridade}
            opcoes={[
              'Ensino Médio Incompleto',
              'Ensino Médio Completo',
              'Ensino Superior Incompleto',
              'Ensino Superior Completo'
            ]}
          />
        </div>
      </div>
    );
  }
}

export default Etapa1;