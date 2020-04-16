import React, {Component} from 'react'

import '../SecaoComentario/SecaoComentario.css'

import iconeInstagram from '../../img/instagram.png'
import iconeFacebook from '../../img/facebook.png'
import iconeTwitter from '../../img/twitter.png'

export class SecaoCompartilhamento extends Component {
	state = {
        valorCompartilhamento: ''
    }

	onChangeComentario = (event) => {
		this.setState({valorCompartilhamento: event.target.value}) 
    }
    
    onClickInstagram = () => {
        console.log('Post compartilhado no Instagram com a mensagem:', this.state.valorCompartilhamento);
    }

    onClickFacebook = () => {
        console.log('Post compartilhado no Facebook com a mensagem:', this.state.valorCompartilhamento);
    }
    
    onClickTwitter = () => {
        console.log('Post compartilhado no Twitter com a mensagem:', this.state.valorCompartilhamento);
    }

	render() {
		return <div className={'sharing-container'}>
            <div>
                <button onClick={this.props.aoEnviar}><img alt={'Instagram'} src={iconeInstagram} onClick={this.onClickInstagram} /></button>
                <button onClick={this.props.aoEnviar}><img alt={'Facebook'} src={iconeFacebook} onClick={this.onClickFacebook} /></button>
                <button onClick={this.props.aoEnviar}><img alt={'Twitter'} src={iconeTwitter} onClick={this.onClickTwitter} /></button>
            </div>
            <input
                className={'input-sharing'}
                placeholder={'Comentário'}
                value={this.state.valorCompartilhamento}
                onChange={this.onChangeComentario}
            />
		</div>
	}
}
