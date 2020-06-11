import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardTripContainer,
  TripTitle,
  TripParagraph
} from './style';

const CardTrip = (props) => {

  const { name, planet, description, date, durationInDays, id } = props.trip;

  const history = useHistory();

  const goToTripDetail = (tripId) => {
    history.push(`/trips/details/${tripId}`);
  }
  
  return (
    <CardTripContainer onClick={() => goToTripDetail(id)} >
      <TripTitle>{name}</TripTitle>
      <TripParagraph>{description}</TripParagraph>
      <TripParagraph>Planeta: {planet}</TripParagraph>
      <TripParagraph>Data de lançamento: {date}</TripParagraph>
      <TripParagraph>Duração: {durationInDays} (dias)</TripParagraph>
    </CardTripContainer>
  )
}

export default CardTrip;