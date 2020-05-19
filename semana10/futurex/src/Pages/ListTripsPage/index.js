import React, { useState, useEffect } from 'react'; 
import Header from '../../components/Header';
import NavMenu from '../../components/NavMenu';
import CardTrip from '../../components/CardTrip';
import Footer from '../../components/Footer';
import {
  ListTripsPageContainer,
} from './style';
import axios from 'axios';

const ListTripsPage = (props) => {

  const [tripsList, setTripsList] = useState([])

  const aluno = 'rafael-cardoso-julian';

  useEffect(() => {
    axios
      .get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${aluno}/trips`)
      .then(response => {
        setTripsList(response.data.trips);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <ListTripsPageContainer>
      <Header />
      <NavMenu />
      {tripsList.map(trip => {
        return <CardTrip key={trip.id} trip={trip} />
      })}
      ListTripsPageContainer
      <Footer />
    </ListTripsPageContainer>
  )
}

export default ListTripsPage