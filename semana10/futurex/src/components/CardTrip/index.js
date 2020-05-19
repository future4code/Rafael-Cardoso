import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardTripContainer
} from './style';

const CardTrip = (props) => {

  const history = useHistory();

  const goToTripDetail = (id) => {
    history.push(`/trips/details/${id}`);
  }
  
  return (
    <CardTripContainer onClick={() => goToTripDetail(props.trip.id)} >
      CardTrip
    </CardTripContainer>
  )
}

export default CardTrip;