import React from 'react';
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import Footer from '../../components/Footer';
import {
  CreateTripPageContainer,
} from './style';
import axios from 'axios';

const CreateTripPage = (props) => {
  return (
    <CreateTripPageContainer>
      <Header />
      <NavMenu />
      CreateTripPageContainer
      <Footer />
    </CreateTripPageContainer>
  )
}

export default CreateTripPage