import React, { useState } from 'react';
import {
  PageContainer,
  CreateTripPageContainer,
  CreateFormContainer,
  CreateFormControl,
  CreateTextField,
  CreateInputLabel, 
  CreateSelect,
  CreateMenuItem,
  CreateDatePicker,
  CreateProvider,
  CreateSubmitButton
} from './style';
import DateFnsUtils from '@date-io/date-fns';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { usePrivatePage } from '../../hooks/usePrivatePage';
import axios from 'axios';

const CreateTripPage = (props) => {

  usePrivatePage()

  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('');
  const [date, setDate] = useState(Date());
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const formatDate = (date) => {
    const array = date.toString().split(' ');
    const day = array[2];
    let month;
    months.forEach((monthFromList, idx) => {
      if (monthFromList === array[1]) {
        month = String(idx + 1);
        if (month.length === 1) {
          month = `0${month}`;
        }
      }
    })
    const year = `${array[3].split('')[2]}${array[3].split('')[3]}`;
    return `${day}/${month}/${year}`
  }

  const submitSubscription = () => {
    const token = window.localStorage.getItem('token');
    const body = {
      'name': name,
      'planet': planet,
      'date': formatDate(date),
      'description': description,
      'duration': Number(duration)
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips`, body, {
      headers: {
        auth: token
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <PageContainer>
      <Header />
      <CreateTripPageContainer>
        <h3>Crie uma viagem</h3>
        <CreateFormContainer>
          <CreateFormControl>
            <CreateTextField
              value={name}
              onChange={event => setName(event.target.value)}
              label={'Nome'}
            />
          </CreateFormControl>
          <CreateFormControl>
            <CreateInputLabel>Planeta</CreateInputLabel>
            <CreateSelect
              value={planet}
              onChange={event => setPlanet(event.target.value)}
            >
              {props.planets.map((planet, idx) => {
                return <CreateMenuItem key={idx} value={planet} >{planet}</CreateMenuItem>
              })}
            </CreateSelect>
          </CreateFormControl>
          <CreateProvider utils={DateFnsUtils}>
            <CreateDatePicker 
              value={date}
              onChange={setDate}
              label={'Data'}
              format='dd/MM/yy'
            />
          </CreateProvider>
          <CreateFormControl>
            <CreateTextField
              value={description}
              onChange={event => setDescription(event.target.value)}
              label={'Descrição'}
            />
          </CreateFormControl>
          <CreateFormControl>
            <CreateTextField
              value={duration}
              onChange={event => setDuration(event.target.value)}
              label={'Duração (em dias)'}
              type='number'
            />
          </CreateFormControl>
          <CreateSubmitButton onClick={submitSubscription} >Cadastrar</CreateSubmitButton>
        </CreateFormContainer>
      </CreateTripPageContainer>
      <Footer />
    </PageContainer>
  )
}

export default CreateTripPage