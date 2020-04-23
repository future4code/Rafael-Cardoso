import React from 'react';
import './App.css';
import Etapa1 from './components/Etapa1';
import Etapa2 from './components/Etapa2';
import Etapa3 from './components/Etapa3';
import Final from './components/Final';
import styled from 'styled-components';

const Button = styled.button`
  margin: 1em;
`

class App extends React.Component {
  state = {
    etapa: 1,
    valorInputNome: '',
    avisoInputNome: '',
    valorInputIdade: '',
    avisoInputIdade: '',
    valorInputEmail: '',
    avisoInputEmail: '',
    valorSelectEscolaridade: 'Ensino Médio Incompleto',
    valorInputCurso: '',
    avisoInputCurso: '',
    valorInputUnidadeEnsino: '',
    avisoInputUnidadeEnsino: '',
    valorInputMotivo: '',
    avisoInputMotivo: '',
    valorSelectCursoComplementar: 'Nenhum'
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

  onChangeSelectEscolaridade = (event) => {
    this.setState({valorSelectEscolaridade: event.target.value});
  }

  onChangeInputCurso = (event) => {
    this.setState({valorInputCurso: event.target.value});
  }

  onChangeInputUnidadeEnsino = (event) => {
    this.setState({valorInputUnidadeEnsino: event.target.value});
  }

  onChangeInputMotivo = (event) => {
    this.setState({valorInputMotivo: event.target.value});
  }

  onChangeSelectCursoComplementar = (event) => {
    this.setState({valorSelectCursoComplementar: event.target.value})
  }

  renderizaEtapa = () => {
    switch (this.state.etapa) {
      case 1:
        return <Etapa1 
          valorInputNome={this.state.valorInputNome} 
          valorInputIdade={this.state.valorInputIdade} 
          valorInputEmail={this.state.valorInputEmail}
          valorSelectEscolaridade={this.state.ValorSelectEscolaridade}
          onChangeInputNome={this.onChangeInputNome}
          onChangeInputIdade={this.onChangeInputIdade}
          onChangeInputEmail={this.onChangeInputEmail} 
          onChangeSelectEscolaridade={this.onChangeSelectEscolaridade}
          avisoInputNome={this.state.avisoInputNome}
          avisoInputIdade={this.state.avisoInputIdade}
          avisoInputEmail={this.state.avisoInputEmail}
        />;
      case 2:
        return <Etapa2 
          valorInputCurso={this.state.valorInputCurso}
          valorInputUnidadeEnsino={this.state.valorInputUnidadeEnsino}
          onChangeInputCurso={this.onChangeInputCurso}
          onChangeInputUnidadeEnsino={this.onChangeInputUnidadeEnsino}
          avisoInputCurso={this.state.avisoInputCurso}
          avisoInputUnidadeEnsino={this.state.avisoInputUnidadeEnsino}
        />;
      case 3:
        return <Etapa3 
          valorInputMotivo={this.state.valorInputMotivo}
          valorSelectCursoComplementar={this.state.valorSelectCursoComplementar}
          onChangeInputMotivo={this.onChangeInputMotivo}
          onChangeSelectCursoComplementar={this.onChangeSelectCursoComplementar}
          avisoInputMotivo={this.state.avisoInputMotivo}
        />;
      case 4:
        return <Final />;
      default:
        return;
    }
  }

  mostraBotao = () => {
    return this.state.etapa < 4 ? <Button onClick={this.vaiProximaEtapa}>Próxima Etapa</Button> : undefined
  }

  vaiProximaEtapa = () => {
    if (this.verificaCampos()) {
      if (this.state.etapa === 1) {
        if (this.state.valorSelectEscolaridade.includes('Superior')) {
          this.setState({etapa: 2})
        } else if (this.state.valorSelectEscolaridade.includes('Médio')) {
          this.setState({etapa: 3})
        }
      } else {
        this.setState({etapa: 4})
      }
    }
  }

  verificaCampos = () => {
    let camposValidos = true;
    switch (this.state.etapa) {
      case 1:
        if (this.state.valorInputNome === '' || this.state.valorInputIdade === '' || this.state.valorInputEmail === '') {
          alert('Todos os campos da etapa 1 devem ser preenchidos!');
          camposValidos = false;
        }
        this.setState({
          avisoInputNome: !this.state.valorInputNome && 'Preencha seu nome!',
          avisoInputIdade: !this.state.valorInputIdade && 'Preencha sua idade!',
          avisoInputEmail: !this.state.valorInputEmail && 'Preencha seu email!'
        });
        break;
      case 2:
        if (this.state.valorInputCurso === '' || this.state.valorInputUnidadeEnsino === '') {
          alert('Todos os campos da etapa 2 devem ser preenchidos!');
          camposValidos = false;
        }
        this.setState({
          avisoInputCurso: !this.state.valorInputCurso && 'Preencha seu curso!',
          avisoInputUnidadeEnsino: !this.state.valorInputUnidadeEnsino && 'Preencha sua unidade de ensino!'
        });
        break;
      case 3:
        if (this.state.valorInputMotivo === '') {
          alert('Todos os campos da etapa 3 devem ser preenchidos!');
          camposValidos = false;
        }
        this.setState({avisoInputMotivo: !this.state.valorInputMotivo && 'Preencha o motivo de não ter feito curso superior!'});
        break;
      default:
        camposValidos = true;
        break;
    }
    return camposValidos;
  }

  render(){

    return (
      <div className="App">
        {this.renderizaEtapa()}
        {this.mostraBotao()}
      </div>
    );
  }
}

export default App;