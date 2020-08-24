import React from 'react';
import styled from 'styled-components';

import FileUploader from './FileUploader';

const AppContainer = styled.div`
  margin: 2rem 0;
`

const App = () => {

  return ( 
    <AppContainer> 
      <FileUploader />
    </AppContainer>
  )
}

export default App;