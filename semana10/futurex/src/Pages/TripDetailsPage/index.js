import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  PageContainer,
  TripDetailsPageContainer,
  DetailsContainer,
  CandidatesContainer,
  TripTitle,
  TripParagraph,
  ApprovedList
} from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CandidateDetail from '../../components/CandidateDetail';
import ApprovedCandidate from '../../components/ApprovedCandidate';
import { usePrivatePage } from '../../hooks/usePrivatePage';
import axios from 'axios';

const TripDetailsPage = (props) => {

  usePrivatePage();

  const [tripDetail, setTripDetail] = useState({});

  const [decide, setDecide] = useState(false);

  const { id, name, description, planet, date, durationInDays, candidates, approved } = tripDetail;
  
  const pathParams = useParams();

  const history = useHistory();

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trip/${pathParams.tripId}`, {
      headers: {
        auth: token
      }
    })
    .then(response => {
      setTripDetail(response.data.trip);
    })
    .catch(error => {
      console.log(error);
    })
  }, [decide, setTripDetail, pathParams, props.aluno]);

  return (
    <PageContainer>
      <Header />
      <TripDetailsPageContainer>
        <DetailsContainer>
          <TripTitle>{name}</TripTitle>
          <TripParagraph>{description}</TripParagraph>
          <TripParagraph>Planeta: {planet}</TripParagraph>
          <TripParagraph>Data de lançamento: {date}</TripParagraph>
          <TripParagraph>Duração: {durationInDays} dias</TripParagraph>
          <ApprovedList>Candidatos aprovados:
            {(approved || []).map((person, idx) => {
              return (
                <ApprovedCandidate
                  key={idx} 
                  person={person}
                />
              )
            })}
          </ApprovedList>
        </DetailsContainer>
        <CandidatesContainer>
          <TripTitle>Candidatos para viagem:</TripTitle>
          {(candidates || []).map((candidate, idx) => {
            return (
              <CandidateDetail 
                key={idx} 
                tripId={id} 
                candidate={candidate} 
                aluno={props.aluno} 
                decide={decide}
                setDecide={setDecide} 
              />
            )
          })}
        </CandidatesContainer>
      </TripDetailsPageContainer>
      <Footer />
    </PageContainer>
  )
}

export default TripDetailsPage;