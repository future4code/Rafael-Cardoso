import React from 'react';
import { useParams } from 'react-router-dom';
import {
  TripDetailsPageContainer,
} from './style';
import axios from 'axios';

const TripDetailsPage = (props) => {

  const pathParams = useParams();

  return (
    <TripDetailsPageContainer>
      TripDetailsPageContainer
    </TripDetailsPageContainer>
  )
}

export default TripDetailsPage;