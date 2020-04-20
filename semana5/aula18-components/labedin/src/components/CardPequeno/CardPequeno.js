import React from 'react';
import './CardPequeno.css'

function CardPequeno (props) {
    return(
        <div className='smallcard-container'>
            <img src={ props.imagem }/>
            <p><strong>{ props.nome }</strong>{ props.descricao }</p>
        </div>
    );
}

export default CardPequeno;