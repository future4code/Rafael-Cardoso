import React from 'react';
import {
  CandidateDetailContainer,
  CandidateDataContainer,
  CandidateChoiceContainer,
  CandidateParagraph,
  ChoiceButton
} from './style';
import axios from 'axios';

const CandidateDetail = (props) => {

  const { id, name, age, profession, country, applicationText } = props.candidate;
  const tripId = props.tripId;

  const decideCandidate = (choice) => {
    const token = window.localStorage.getItem('token');
    const body = {
      'approve': choice
    }
    axios.put(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips/${tripId}/candidates/${id}/decide`, body, {
      headers: {
        auth: token
      }
    })
    .then(response => {
      console.log(response.data);
      props.setDecide(!props.decide);
    })
    .catch(error => {
      console.log(error);
    })
  }
  

  return (
    <CandidateDetailContainer>
      <CandidateDataContainer>
        <CandidateParagraph>{name}, {age} anos</CandidateParagraph>
        <CandidateParagraph>{applicationText}</CandidateParagraph>
        <CandidateParagraph>Profissão: {profession}</CandidateParagraph>
        <CandidateParagraph>País de origem: {country}</CandidateParagraph>
      </CandidateDataContainer>
      <CandidateChoiceContainer>
        <ChoiceButton onClick={() => decideCandidate(true)} >Aprovar</ChoiceButton>
        <ChoiceButton onClick={() => decideCandidate(false)} >Reprovar</ChoiceButton>
      </CandidateChoiceContainer>
    </CandidateDetailContainer>
  )
}

export default CandidateDetail;