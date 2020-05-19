import React from 'react';
import { useParams } from 'react-router-dom'
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import Footer from '../../components/Footer';
import {
  TripDetailsPageContainer,
} from './style';
import axios from 'axios';

const TripDetailsPage = (props) => {

  const pathParams = useParams();

  return (
    <TripDetailsPageContainer>
      <Header />
      <NavMenu />
      TripDetailsPageContainer
      <Footer />
    </TripDetailsPageContainer>
  )
}

export default TripDetailsPage;