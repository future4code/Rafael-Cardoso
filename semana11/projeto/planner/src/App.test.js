import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import App from './App';

axios.get = jest.fn().mockResolvedValue('');
axios.post = jest.fn().mockResolvedValue('');

test('Renderização inicial', async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: [
      {
        "day": "Segunda",
        "text": "Lavar a louça",
        "id": "T2CVwljXQJKZ2GTQGmqpn"
      }
    ]
  });
  const { getByLabelText, getByText,  findByText } = render(<App />);

  expect(getByLabelText(/nova tarefa/i)).toBeInTheDocument();
  
  expect(getByLabelText(/dia da semana/i)).toBeInTheDocument();

  expect(getByText(/enviar/i)).toBeInTheDocument();

  expect(axios.get).toHaveBeenCalled();

  expect(await findByText('Lavar a louça')).toBeInTheDocument();
});

test('Cria uma tarefa com sucesso', async () => {
  axios.get = jest.fn().mockResolvedValue({
    data: [
      {
        "day": "Segunda",
        "text": "tarefa teste",
        "id": "T2CVwljXQJKZ2GTQGmqpn"
      }
    ]
  });
  axios.post = jest.fn().mockResolvedValue();

  const { getByLabelText, getByTestId, getByText, findByText } = render(<App />);

  await userEvent.type(getByLabelText(/nova tarefa/i), 'tarefa teste');

  expect(getByLabelText(/nova tarefa/i)).toHaveValue('tarefa teste');

  await userEvent.selectOptions(getByTestId('weekDay'), getByTestId('Segunda'));

  userEvent.click(getByText(/enviar/i));

  expect(axios.post).toHaveBeenCalled();
});
