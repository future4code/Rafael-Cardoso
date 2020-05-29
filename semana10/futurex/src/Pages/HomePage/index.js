import React, { useState, useEffect } from 'react';
import {
  PageContainer,
  HomePageContainer,
  FormContainer,
  TripTextField,
  TripFormControl,
  TripMenuItem,
  SubmitButton
} from './style';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';
import countryList from 'react-select-country-list';

const HomePage = (props) => {

  const [tripsList, setTripsList] = useState([]);
  const countries = countryList().getData();

  const { form, onChange, resetForm } = useForm({
    name: '',
    age: '',
    applicationText: '',
    profession: '',
    country: '',
    tripId: ''
  })

  const { name, age, applicationText, profession, country, tripId } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  }

  useEffect(() => {
    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips`)
    .then(response => {
      setTripsList(response.data.trips);
    })
    .catch(error => {
      console.log(error);
    })
  }, [props.aluno])

  const submitSubscription = (event) => {
    event.preventDefault();
    const body = {
      'name': name,
      'age': Number(age),
      'applicationText': applicationText,
      'profession': profession,
      'country': country
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips/${tripId}/apply`, body)
    .then(response => {
      console.log(response);
      resetForm();
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <PageContainer>
      <Header />
      <HomePageContainer>
        <h3>Inscreva-se em uma viagem</h3>
        <FormContainer onSubmit={submitSubscription} >
          <TripFormControl>
            <TripTextField 
              name='name'
              value={name}
              onChange={handleInputChange}
              label={'Nome'}
              inputProps={{ pattern: '[A-Za-z\u00C0-\u017F ]{3,}', title: 'Mínimo 3 caracteres' }}
              required
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField 
              name='age'
              value={age}
              onChange={handleInputChange}
              label={'Idade'}
              type='number'
              inputProps={{ min: 18, title: 'Mínimo 18 anos' }}
              required
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField 
              name='applicationText'
              value={applicationText}
              onChange={handleInputChange}
              label={'Motivação'}
              inputProps={{ pattern: '[A-Za-z\u00C0-\u017F ,.!]{30,}', title: 'Mínimo 30 caracteres' }}
              required
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField 
              name='profession'
              value={profession}
              onChange={handleInputChange}
              label={'Profissão'}
              inputProps={{ pattern: '[A-Za-z\u00C0-\u017F ]{10,}', title: 'Mínimo 10 caracteres' }}
              required
            />
          </TripFormControl>
          <TripFormControl>
            <TripTextField
              select
              name='country'
              value={country}
              onChange={handleInputChange}
              label={'País'}
              required
            >
              {countries.map(country => {
                return <TripMenuItem key={country.value} value={country.label} >{country.label}</TripMenuItem>
              })}
            </TripTextField>
          </TripFormControl>
          <TripFormControl>
            <TripTextField
              select
              name='tripId'
              value={tripId}
              onChange={handleInputChange}
              label={'Viagem'}
              required
            >
              {tripsList.map(trip => {
                return <TripMenuItem key={trip.id} value={trip.id} >{trip.name} - {trip.planet}</TripMenuItem>
              })}
            </TripTextField>
          </TripFormControl>
          <SubmitButton type='submit' >Inscrever-se</SubmitButton>
        </FormContainer>
      </HomePageContainer>
      <Footer />
    </PageContainer>
  )
}

export default HomePage;