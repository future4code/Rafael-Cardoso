import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import {
  HomePageContainer,
} from './style';
import axios from 'axios';

const HomePage = (props) => {
  return (
    <HomePageContainer>
      <Header />
      HomePageContainer
      <Footer />
    </HomePageContainer>
  )
}

export default HomePage;