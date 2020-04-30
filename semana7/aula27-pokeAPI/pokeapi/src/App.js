import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state = {
    listaPokemon: [],
    listaTiposPokemos: [],
    imagemPokemon: '',
    listaTipos: []
  }

  componentDidMount() {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151').then(response => {
      this.setState({ listaPokemon: response.data.results })
    }).catch(error => {
      console.log(error);
    })
    axios.get('https://pokeapi.co/api/v2/type').then(response => {
      this.setState({ listaTipos: response.data.results })
    }).catch(error => {
      console.log(error);
    })
  }

  buscaPokemon = (event) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${event.target.value}`).then(response => {
      this.setState({ listaTiposPokemos: response.data.types, imagemPokemon: response.data.sprites.front_default })
    }).catch(error => {
      console.log(error);
    })
  }

  render() {

    return (
      <div className="App">
        <div>
          <div>
            <h4>Selecione um Pokémon</h4>
            <select onChange={this.buscaPokemon}>
              <option value={''}>Nenhum</option>
              {this.state.listaPokemon.map((pokemon, idx) => {
                return <option key={idx} value={pokemon.name} >{pokemon.name}</option>
              })}
            </select>
          </div>
          
          <div>
            {this.state.imagemPokemon && <img src={this.state.imagemPokemon} alt='pokemon' />}
          </div>
          




          <div>
            <h4>Selecione um Tipo</h4>
            <select>
              <option>Nenhum</option>
              {this.state.listaTipos.map((tipo, idx) => {
                return <option key={idx}>{tipo.name}</option>
              })}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
