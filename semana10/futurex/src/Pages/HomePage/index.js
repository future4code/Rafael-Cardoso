import React, { useState, useEffect } from 'react';
import {
  PageContainer,
  HomePageContainer,
  FormContainer,
  TripTextField,
  TripFormControl,
  TripInputLabel,
  TripSelect,
  TripMenuItem,
  SubmitButton
} from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import axios from 'axios';
import countryList from 'react-select-country-list';

const HomePage = (props) => {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [applicationText, setApplicationText] = useState('');
  const [profession, setProfession] = useState('');
  const [country, setCountry] = useState('');
  const [trip, setTrip] = useState('');
  const [tripsList, setTripsList] = useState([]);
  const countries = countryList().getData();

  useEffect(() => {
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips`)
    .then(response => {
      setTripsList(response.data.trips);
    })
    .catch(error => {
      console.log(error);
    })
  }, [props.aluno])

  const submitSubscription = () => {
    const body = {
      'name': name,
      'age': age,
      'applicationText': applicationText,
      'profession': profession,
      'country': country
    }
    axios
      .post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips/${trip}/apply`, body)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
    setName('');
    setAge('');
    setApplicationText('');
    setProfession('');
    setCountry('');
    setTrip('');
  }

  return (
    <PageContainer>
      <Header />
      <HomePageContainer>
        <h3>Inscreva-se em uma viagem</h3>
        <FormContainer>
          <TripFormControl>
            <TripTextField 
              value={name}
              onChange={event => setName(event.target.value)}
              label={'Nome'}
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField 
              value={age}
              onChange={event => setAge(event.target.value)}
              label={'Idade'}
              type={'number'}
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField 
              value={applicationText}
              onChange={event => setApplicationText(event.target.value)}
              label={'Motivação'}
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField 
              value={profession}
              onChange={event => setProfession(event.target.value)}
              label={'Profissão'}
            />
          </TripFormControl>
          <TripFormControl>
            <TripInputLabel>País</TripInputLabel>
            <TripSelect
              value={country}
              onChange={event => setCountry(event.target.value)}
            >
              {countries.map(country => {
                return <TripMenuItem key={country.value} value={country.label} >{country.label}</TripMenuItem>
              })}
            </TripSelect>
          </TripFormControl>
          <TripFormControl>
            <TripInputLabel>Viagem</TripInputLabel>
            <TripSelect
              value={trip}
              onChange={event => setTrip(event.target.value)}
            >
              {tripsList.map(trip => {
                return <TripMenuItem key={trip.id} value={trip.id} >{trip.name}</TripMenuItem>
              })}
            </TripSelect>
          </TripFormControl>
          <SubmitButton onClick={submitSubscription} >Inscrever-se</SubmitButton>
        </FormContainer>
      </HomePageContainer>
      <Footer />
    </PageContainer>
  )
}

export default HomePage;