import React, {useState} from 'react';
import TelaInicial from './Container/TelaInicial';
import TelaMatches from './Container/TelaMatches';
import Header from './components/Header';
import BotaoLimpar from './components/BotaoLimpar';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  max-width: 500px;
  height: 700px;
  border: 1px solid black;
  padding: 0 1rem;
`

function App() {

  const [telaInicial, setTelaInicial] = useState(true);
  const aluno = 'rafael-cardoso';

  const trocaTela = () => {
    setTelaInicial(!telaInicial);
  }

  const telaRenderizada = telaInicial ? (
    <TelaInicial 
      aluno={aluno}
    />
  ) : (
    <TelaMatches 
      aluno={aluno}
    />
  )

  return (
    <Container>
      <Header trocaTela={trocaTela} telaInicial={telaInicial} />
      {telaRenderizada}
      <BotaoLimpar aluno={aluno} setTelaInicial={setTelaInicial} />
    </Container>
  );
}

export default App;
