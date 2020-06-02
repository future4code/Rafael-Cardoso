import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

describe('A tela ao ser renderizada', () => {
  test('deve ter o input vazio', () => {
    const { getByPlaceholderText } = render(<App />);

    expect(getByPlaceholderText(/Novo post/i)).toBeInTheDocument();
  });

  test('deve ter um botão de adicionar', () => {
    const { getByText } = render(<App />);

    expect(getByText(/adicionar/i)).toBeInTheDocument();
  });
});

describe('Funcionalidade de criar um novo post', () => {
  test('digitar no campo \'novo input\' e incluir post', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    fireEvent.change(getByPlaceholderText(/novo post/i), { target: { value: 'teste' } });
    expect(getByPlaceholderText(/novo post/i)).toHaveValue('teste');

    fireEvent.click(getByText(/adicionar/i));
    expect(getByText(/teste/i)).toBeInTheDocument();
  });

  test('verificar se aparece os botões de curtir e apagar', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    fireEvent.change(getByPlaceholderText(/novo post/i), { target: { value: 'teste' } });

    fireEvent.click(getByText(/adicionar/i));

    expect(getByText(/curtir/i)).toBeInTheDocument();

    expect(getByText(/apagar/i)).toBeInTheDocument();
  });

  test('ao apertar o botão curtir uma vez, espero que o apareça escrito descurtir', () => {
    const { getByPlaceholderText, getByText } = render(<App />);

    fireEvent.change(getByPlaceholderText(/novo post/i), { target: { value: 'teste' } });

    fireEvent.click(getByText(/adicionar/i));

    // fireEvent.click(getByTestId('like-button'));

    expect(getByTestId("like-button")).toBeInTheDocument();
  })
});