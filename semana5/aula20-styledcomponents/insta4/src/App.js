import React from 'react';
import './App.css';
import Post from './components/Post/Post';
import styled from 'styled-components'

const listaDePosts = [
  {
    nomeUsuario: 'paulinha',
    fotoUsuario: 'https://picsum.photos/50/50?a1',
    fotoPost: 'https://picsum.photos/200/150?a1'
  },
  {
    nomeUsuario: 'zezinho',
    fotoUsuario: 'https://picsum.photos/50/50?a2',
    fotoPost: 'https://picsum.photos/200/150?a2'
  },
  {
    nomeUsuario: 'malukete',
    fotoUsuario: 'https://picsum.photos/50/50?a3',
    fotoPost: 'https://picsum.photos/200/150?a3'
  }
]

const FormContainer = styled.div`
  margin-bottom: 10px;
`
const FormInput = styled.div`
  margin-bottom: 5px;
`
const Input = styled.input`
  margin-right: 5px;
`
const FormButton = styled.div`
  display: flex;
  justify-content: flex-end;
`

class App extends React.Component {
  state = {
    listaDePosts: listaDePosts,
    valorInputNomeUsuario: '',
    valorInputFotoUsuario: '',
    valorInputFotoPost: ''
  }

  adicionaPost = () => {
    const novoPost = {
      nomeUsuario: this.state.valorInputNomeUsuario,
      fotoUsuario: this.state.valorInputFotoUsuario,
      fotoPost: this.state.valorInputFotoPost
    }

    const novoPosts = this.state.listaDePosts;
    novoPosts.push(novoPost)

    this.setState({
      listaDePosts: novoPosts,
      valorInputNomeUsuario: '',
      valorInputFotoUsuario: '',
      valorInputFotoPost: ''
    });
  }

  onChangeInputNomeUsuario = (event) => {
    this.setState({valorInputNomeUsuario: event.target.value})
  }

  onChangeInputFotoUsuario = (event) => {
    this.setState({valorInputFotoUsuario: event.target.value})
  }

  onChangeInputFotoPost = (event) => {
    this.setState({valorInputFotoPost: event.target.value})
  }

  render() {
    const listaDePostsNaTela = this.state.listaDePosts.map(post => {

      return (
        <Post
          nomeUsuario={post.nomeUsuario}
          fotoUsuario={post.fotoUsuario}
          fotoPost={post.fotoPost}
        />
      );
    })
    return (
      <div className={'app-container'}>
        {listaDePostsNaTela}
        <FormContainer>
          <FormInput>
            <Input value={this.state.valorNomeUsuario} placeholder={'Nome'} onChange={this.onChangeInputNomeUsuario} />
            <Input value={this.state.valorFotoPost} placeholder={'Foto Post'} onChange={this.onChangeInputFotoPost} />
            <Input value={this.state.valorFotoUsuario} placeholder={'Foto Usuário'} onChange={this.onChangeInputFotoUsuario} />
          </FormInput>
          <FormButton>
            <button onClick={this.adicionaPost}>Adicionar</button>
          </FormButton>
        </FormContainer>
      </div>
    )
  }
}

export default App;
