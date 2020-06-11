import React, { useState } from 'react';
import {
  PageContainer,
  CreateTripPageContainer,
  CreateFormContainer,
  CreateFormControl,
  CreateTextField,
  CreateMenuItem,
  CreateDatePicker,
  CreateProvider,
  CreateSubmitButton
} from './style';
import DateFnsUtils from '@date-io/date-fns';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { usePrivatePage } from '../../hooks/usePrivatePage';
import { useForm } from '../../hooks/useForm';
import axios from 'axios';

const CreateTripPage = (props) => {

  usePrivatePage()

  const [date, setDate] = useState(Date());

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const { form, onChange, resetForm } = useForm({
    name: '',
    planet: '',
    description: '',
    duration: ''
  })
  
  const { name, planet, description, duration } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  }

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

  const submitSubscription = (event) => {
    event.preventDefault();
    const token = window.localStorage.getItem('token');
    const body = {
      'name': name,
      'planet': planet,
      'date': formatDate(date),
      'description': description,
      'durationInDays': Number(duration)
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/labeX/${props.aluno}/trips`, body, {
      headers: {
        auth: token
      }
    })
    .then(response => {
      console.log(response.data);
      resetForm();
      setDate(Date());
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
        <CreateFormContainer onSubmit={submitSubscription} >
          <CreateFormControl>
            <CreateTextField
              name='name'
              value={name}
              onChange={handleInputChange}
              label={'Nome'}
              inputProps={{ pattern: '[a-zA-Z\u00C0-\u017F ]{5,}', title: 'Mínimo 5 caracteres' }}
              required
            />
          </CreateFormControl>
          <CreateFormControl>
            <CreateTextField
              select
              name='planet'
              value={planet}
              onChange={handleInputChange}
              label={'Planeta'}
              required
            >
              {props.planets.map((planet, idx) => {
                return <CreateMenuItem key={idx} value={planet} >{planet}</CreateMenuItem>
              })}
            </CreateTextField>
          </CreateFormControl>
          <CreateFormControl>
            <CreateProvider utils={DateFnsUtils}>
              <CreateDatePicker 
                name='date'
                value={date}
                onChange={setDate}
                label={'Data'}
                format='dd/MM/yy'
                minDate={Date()}
              />
            </CreateProvider>
          </CreateFormControl>
          <CreateFormControl>
            <CreateTextField
              name='description'
              value={description}
              onChange={handleInputChange}
              label={'Descrição'}
              inputProps={{ pattern: '[A-Za-z\u00C0-\u017F ,.!]{30,}', title: 'Mínimo 30 caracteres' }}
              required
            />
          </CreateFormControl>
          <CreateFormControl>
            <CreateTextField
              name='duration'
              value={duration}
              onChange={handleInputChange}
              label={'Duração (em dias)'}
              type='number'
              inputProps={{ min: 50, title: 'Mínimo 50 dias' }}
              required
            />
          </CreateFormControl>
          <CreateSubmitButton type='submit' >Cadastrar</CreateSubmitButton>
        </CreateFormContainer>
      </CreateTripPageContainer>
      <Footer />
    </PageContainer>
  )
}

export default CreateTripPage