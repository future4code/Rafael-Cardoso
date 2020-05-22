import React, { useState, useEffect } from 'react';
import {
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
import axios from 'axios';

const CreateTripPage = (props) => {

  const [name, setName] = useState('');
  const [planet, setPlanet] = useState('');
  const [date, setDate] = useState(Date());
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');

  const submitSubscription = () => {
    const body = {
      'name': name,
      'planet': planet,
      'date': date,
      'description': description,
      'duration': Number(duration)
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips`, body, {
      headers: {
        Authorization: props.token
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
            type={'number'}
          />
        </CreateFormControl>
        <CreateSubmitButton onClick={submitSubscription} >Cadastrar</CreateSubmitButton>
      </CreateFormContainer>
    </CreateTripPageContainer>
  )
}

export default CreateTripPage