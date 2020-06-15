import React from 'react';
import { useForm } from '../../hooks/useForm';
import {
  FormContainer,
  FormFormControl,
  FormTextField,
  FormMenuItem,
  FormButton
} from './style';
import axios from 'axios';

const Form = (props) => {

  const [dias, aluno, counter, setCounter] = props.props

  const { form, onChange, resetForm } = useForm({
    text: '',
    day: 'Segunda'
  });
  
  const { text, day } = form;

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    onChange(name, value);
  }

  const addNewTask = (event) => {
    event.preventDefault();
    const body = {
      text: text,
      day: day
    }
    axios.post(`https://us-central1-labenu-apis.cloudfunctions.net/generic/${aluno}`, body)
    .then(response => {
      console.log(response);
      setCounter(!counter)
      resetForm();
    })
    .catch(error => {
      console.log(error);
    })
  }

  return (
    <FormContainer onSubmit={addNewTask} >
      <FormFormControl htmlFor='nova-tarefa' >
        <FormTextField 
          name='text'
          value={text}
          onChange={handleInputChange}
          label='Nova Tarefa'
          id='nova-tarefa'
          required
        />
      </FormFormControl>
      <FormFormControl htmlFor='dia-semana' >
        <FormTextField
          select
          name='day'
          value={day}
          onChange={handleInputChange}
          label='Dia da semana'
          id='dia-semana'
          data-testid='weekDay'
          required
        >
          {dias.map((dia, idx) => {
            return <FormMenuItem key={idx} value={dia} data-testid={dia} >{dia}</FormMenuItem>
          })}
        </FormTextField>
      </FormFormControl>
      <FormButton type='submit' >Enviar</FormButton>
    </FormContainer>
  );
}

export default Form;