import React from 'react'
import './Post.css'

import {IconeComContador} from '../IconeComContador/IconeComContador'

import {IconeSemContador} from '../IconeSemContador/IconeSemContador'

import {SecaoComentario} from '../SecaoComentario/SecaoComentario'

import {SecaoCompartilhamento} from '../SecaoCompartilhamento/SecaoCompartilhamento'

import iconeCoracaoBranco from '../../img/favorite-white.svg'
import iconeCoracaoPreto from '../../img/favorite.svg'
import iconeMarcadoBranco from '../../img/bookmark-white.svg'
import iconeMarcadoPreto from '../../img/bookmark-black.svg'
import iconeComentario from '../../img/comment_icon.svg'
import iconeCompartilhar from '../../img/share.svg'

class Post extends React.Component {
  state = {
    curtido: false,
    numeroCurtidas: 0,
    marcado: false,
    comentando: false,
    numeroComentarios: 0,
    compartilhando: false
  }

  onClickCurtida = () => {
    if (this.state.curtido) {
      this.setState({
        curtido: false,
        numeroCurtidas: this.state.numeroCurtidas - 1
      })
    } else {
      this.setState({
        curtido: true,
        numeroCurtidas: this.state.numeroCurtidas + 1
      })
    }
  }

  onClickMarcado = () => {
    this.setState({
      marcado: !this.state.marcado
    })
  }

  onClickComentario = () => {
    this.setState({
      comentando: !this.state.comentando
    })
  }

  onClickCompartilhado = () => {
    this.setState({
      compartilhando: !this.state.compartilhando
    })
  }

  aoEnviarComentario = () => {
    this.setState({
      comentando: false,
      numeroComentarios: this.state.numeroComentarios + 1
    })
  }

  aoEnviarCompartilhamento = () => {
    this.setState({
      compartilhando: false
    })
  }

  render() {
    let iconeCurtida

    if(this.state.curtido) {
      iconeCurtida = iconeCoracaoPreto
    } else {
      iconeCurtida = iconeCoracaoBranco
    }

    let iconeMarcado
    if(this.state.marcado) {
      iconeMarcado = iconeMarcadoPreto;
    } else {
      iconeMarcado = iconeMarcadoBranco;
    }

    let componenteComentario

    if(this.state.comentando) {
      componenteComentario = <SecaoComentario aoEnviar={this.aoEnviarComentario}/>
    }

    let componenteCompartilhamento

    if(this.state.compartilhando) {
      componenteCompartilhamento = <SecaoCompartilhamento aoEnviar={this.aoEnviarCompartilhamento} />
    }

    return <div className={'post-container'}>
      <div className={'post-header'}>
        <img className={'user-photo'} src={this.props.fotoUsuario} alt={'Imagem do usuario'}/>
        <p>{this.props.nomeUsuario}</p>
      </div>

      <img className={'post-photo'} src={this.props.fotoPost} alt={'Imagem do post'}/>

      <div className={'post-footer'}>
        <IconeComContador
          icone={iconeCurtida}
          onClickIcone={this.onClickCurtida}
          valorContador={this.state.numeroCurtidas}
        />
        
        <IconeSemContador 
          icone={iconeMarcado}
          onClickIcone={this.onClickMarcado}
        />

        <IconeComContador
          icone={iconeComentario}
          onClickIcone={this.onClickComentario}
          valorContador={this.state.numeroComentarios}
        />

        <IconeSemContador
          icone={iconeCompartilhar}
          onClickIcone={this.onClickCompartilhado}
        />
      </div>
      {componenteComentario}
      {componenteCompartilhamento}
    </div>
  }
}

export default Post