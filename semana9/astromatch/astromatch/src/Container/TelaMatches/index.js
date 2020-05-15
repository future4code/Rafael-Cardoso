import React, {useState, useEffect} from 'react';
import ListaMatches from '../../components/ListaMatches'
import {
  TelaMatchesContainer
} from './style';
import axios from 'axios';

const TelaMatches = (props) => {

  const [listaMatches, setListaMatches] = useState([]);

  useEffect(() => {
    axios.get(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${props.aluno}/matches`)
    .then(response => {
      setListaMatches(response.data.matches);
    })
    .catch(error => {
      console.log(error);
    })
  }, [props.aluno])

  return (
    <TelaMatchesContainer>
      <ListaMatches lista={listaMatches} />
    </TelaMatchesContainer>
  )
}

export default TelaMatches;