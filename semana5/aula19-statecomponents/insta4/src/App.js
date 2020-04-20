import React from 'react';
import './App.css';
import Post from './components/Post/Post';

class App extends React.Component {
  render() {
    return (
      <div className={'app-container'}>
        <Post
          nomeUsuario={'paulinha'}
          fotoUsuario={'https://picsum.photos/50/50?a1'}
          fotoPost={'https://picsum.photos/200/150?a1'}
        />
        <Post 
          nomeUsuario={'zezinho'}
          fotoUsuario={'https://picsum.photos/50/50?a2'}
          fotoPost={'https://picsum.photos/200/150?a2'}
        />
        <Post 
          nomeUsuario={'malukete'}
          fotoUsuario={'https://picsum.photos/50/50?a3'}
          fotoPost={'https://picsum.photos/200/150?a3'}
        />
      </div>
    );
  }
}

export default App;
