import React from 'react';
import './App.css';
import CardGrande from './components/CardGrande/CardGrande';
import ImagemButton from './components/ImagemButton/ImagemButton';
import CardPequeno from './components/CardPequeno/CardPequeno';

function App() {
  return (
    <div className="App">
      <div className="page-section-container">
        <h2>Dados pessoais</h2>
        <CardGrande 
          imagem="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" 
          nome="Rafael Felipe Santos Cardoso" 
          descricao="Oi, eu sou o Rafael. Sou aluno da Labenu e me preparo para estar capacitado para o mercado de um desenvolvedor."
        />
        
        <ImagemButton 
          imagem="https://image.flaticon.com/icons/png/512/117/117472.png" 
          texto="Ver mais"
        />

        <CardPequeno 
          imagem={'https://png.pngtree.com/png-clipart/20190515/original/pngtree-email-symbol-icon-png-image_3569789.jpg'}
          nome={'Email: '}
          descricao={'rafafscardoso@gmail.com'}
        />

        <CardPequeno
          imagem={'https://i.dlpng.com/static/png/6418909_preview.png'}
          nome={'Endereço: '}
          descricao={'Rua Jose Candido Ramos, 183'}
        />
      </div>

      <div className="page-section-container">
        <h2>Experiências profissionais</h2>
        <CardGrande 
          imagem="https://media-exp1.licdn.com/dms/image/C4E0BAQEMKdKTfB2kzg/company-logo_200_200/0?e=2159024400&v=beta&t=mJTMGGqfepWxL-ztRSu6B0fFBhldfmlFOgRSCytVyrk" 
          nome="Sandvik MGS" 
          descricao="Engenheiro mecânico na área de projeto de equipamentos de mineração." 
        />
        
        <CardGrande 
          imagem="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/CPTM_icon.svg/1200px-CPTM_icon.svg.png" 
          nome="CPTM" 
          descricao="Trabalho operacional na estação e no atendimento ao público." 
        />
      </div>

      <div className="page-section-container">
        <h2>Minhas redes sociais</h2>
        <ImagemButton 
          imagem="https://d2v9ipibika81v.cloudfront.net/uploads/sites/261/2017/01/facebook-logo-3.png" 
          texto="Facebook" 
        />        

        <ImagemButton 
          imagem="https://logodownload.org/wp-content/uploads/2014/09/twitter-logo-1-1.png" 
          texto="Twitter" 
        />        
      </div>
    </div>
  );
}

export default App;
