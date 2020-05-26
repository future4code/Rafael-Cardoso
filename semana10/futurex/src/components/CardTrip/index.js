import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardTripContainer,
  Titulo,
  Paragrafo
} from './style';

const CardTrip = (props) => {

  const { name, planet, description, date, durationInDays } = props.trip;

  const history = useHistory();

  const goToTripDetail = (id) => {
    history.push(`/trips/details/${id}`);
  }
  
  return (
    <CardTripContainer onClick={() => goToTripDetail(props.trip.id)} >
      <Titulo>{name}</Titulo>
      <Paragrafo>{description}</Paragrafo>
      <Paragrafo>Planeta: {planet}</Paragrafo>
      <Paragrafo>Data de lançamento: {date}</Paragrafo>
      <Paragrafo>Duração: {durationInDays} (dias)</Paragrafo>
    </CardTripContainer>
  )
}

export default CardTrip;