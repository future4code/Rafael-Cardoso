import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import {
  PageContainer,
  TripDetailsPageContainer,
  DetailsContainer,
  CandidatesContainer
} from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CandidateDetail from '../../components/CandidateDetail';
import { usePrivatePage } from '../../hooks/usePrivatePage';
import axios from 'axios';

const TripDetailsPage = (props) => {

  usePrivatePage();

  const [tripDetail, setTripDetail] = useState({});

  const { id, name, description, planet, date, durationInDays, candidates } = tripDetail;
  
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
  }, [setTripDetail, pathParams, props.aluno]);

  // const 

  return (
    <PageContainer>
      <Header />
      <TripDetailsPageContainer>
        <DetailsContainer>
          <h3>{name}</h3>
          <p>{description}</p>
          <p>Planeta: {planet}</p>
          <p>Data de lançamento: {date}</p>
          <p>Duração: {durationInDays} dias</p>
        </DetailsContainer>
        <CandidatesContainer>
          {(candidates || []).map(candidate => {
            return <CandidateDetail key={id} tripId={id} candidate={candidate} />
          })}
        </CandidatesContainer>
      </TripDetailsPageContainer>
      <Footer />
    </PageContainer>
  )
}

export default TripDetailsPage;