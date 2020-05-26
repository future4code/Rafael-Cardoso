import React, { useState } from 'react';
import {
  CandidateDetailContainer
} from './style';
import axios from 'axios';

const CandidateDetail = (props) => {

  const { id, name, age, profession, country, applicationText } = props.candidate;
  const tripId = props.tripId;

  return (
    <CandidateDetailContainer>
      <p>{name}</p>
      <p>{age}</p>
      <p>{profession}</p>
      <p>{country}</p>
      <p>{applicationText}</p>
    </CandidateDetailContainer>
  )
}

export default CandidateDetail;