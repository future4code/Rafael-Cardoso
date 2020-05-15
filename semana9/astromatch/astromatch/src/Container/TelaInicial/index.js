import React, {useState, useEffect} from 'react';
import Perfil from '../../components/Perfil';
import {
  TelaInicialContainer,
} from './style';
import axios from 'axios';

const TelaInicial = (props) => {
  
  const [perfil, setPerfil] = useState({});
  const [perfisVisualizados, setPerfisVisualizados] = useState(0);

  const pegaPerfil = () => {
    axios.get(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${props.aluno}/person`)
      .then(response => {
        setPerfil(response.data.profile);
      })
      .catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    pegaPerfil();
  }, [perfisVisualizados]);

  const escolhePerfil = (id) => {
    escolhePessoa(id, true);
  }

  const naoEscolhePerfil = (id) => {
    escolhePessoa(id, false);
  }

  const escolhePessoa = (id, choice) => {
    setPerfisVisualizados(perfisVisualizados + 1);
    const body = {
      'id': id,
      'choice': choice
    }
    axios.post(`https://us-central1-missao-newton.cloudfunctions.net/astroMatch/${props.aluno}/choose-person`, body)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    }

  return (
    <TelaInicialContainer>
      <Perfil 
        perfil={perfil}
        positivo={escolhePerfil}
        negativo={naoEscolhePerfil}
      /> 
    </TelaInicialContainer>
  )
}

export default TelaInicial;