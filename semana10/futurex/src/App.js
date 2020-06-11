import React from 'react';
import Router from './Router';
import styled from 'styled-components';

const AppContainer = styled.div`
  margin: 0;
`

function App() {
  return (
    <AppContainer>
      <Router />
    </AppContainer>
  );
}

export default App;
