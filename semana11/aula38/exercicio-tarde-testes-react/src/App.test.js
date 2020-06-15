import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "./App";

const criaPost = (qtdePosts, texto) => {
  const utils = render(<App />);

  for (let i = 0; i < qtdePosts; i++) {
    
    fireEvent.change(utils.getByPlaceholderText(/novo post/i), { target: { value: texto } });
    
    fireEvent.click(utils.getByText(/adicionar/i));
  }

  return utils
}

describe('A tela ao ser renderizada', () => {
  test('deve ter um input', () => {
    const { getByPlaceholderText } = render(<App />);

    expect(getByPlaceholderText(/Novo post/i)).toBeInTheDocument();
  });

  test('deve ter um botão de adicionar', () => {
    const { getByText } = render(<App />);

    expect(getByText(/adicionar/i)).toBeInTheDocument();
  });

  test('deve aparecer a mensagem Nenhum Post', () => {
    const { getByText } = render(<App />);

    expect(getByText(/nenhum post/i)).toBeInTheDocument();
  });

  test('não deve aparecer a mensagem de quantidade de posts', () => {
    const { queryByText } = render(<App />);

    expect(queryByText(/quantidade de posts: /i)).not.toBeInTheDocument();
  })
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
    const { getByText } = criaPost(1, 'teste');

    expect(getByText(/curtir/i)).toBeInTheDocument();

    expect(getByText(/apagar/i)).toBeInTheDocument();
  });

  test('ao apertar o botão curtir uma vez, espero que o apareça escrito Descurtir e ao apertar uma segunda vez, volte a aparecer Curtir', () => {
    const { getByTestId } = criaPost(1, 'teste');

    fireEvent.click(getByTestId('like-button'));

    expect(getByTestId('like-button')).toHaveTextContent('Descurtir');

    fireEvent.click(getByTestId('like-button'));

    expect(getByTestId('like-button')).toHaveTextContent('Curtir');
  });

  test('ao apertar o botão Apagar, não deve ter nenhum post e apareça a mensagem Nenhum Post', () => {
    const { queryByText } = criaPost(1, 'teste');

    fireEvent.click(queryByText(/apagar/i));

    expect(queryByText(/teste/i)).not.toBeInTheDocument();
    
    expect(queryByText(/nenhum post/i)).toBeInTheDocument();
  });

  test('espero que o input esteja limpo', () => {
    const { getByPlaceholderText } = criaPost(1, 'teste');

    expect(getByPlaceholderText(/novo post/i)).toHaveValue('');
  });

  test('espero que a mensagem Nenhum Post apague', () => {
    const { queryByText } = criaPost(1, 'teste');

    expect(queryByText(/nenhum post/i)).not.toBeInTheDocument();
  });

  test('espero que apareça a quantidade de posts: 1', () => {
    const { getByText } = criaPost(1, 'teste');

    expect(getByText(/quantidade de posts: 1/i)).toBeInTheDocument();
  });

  test('que dê uma mensagem de erro se o campo de input estiver vazio', () => {
    const { getByText } = criaPost(1, '');

    expect(getByText(/não é possível criar um post vazio/i)).toBeInTheDocument();
  });

  test('depois de criar um post vazio, ao tentar criar outro com conteúdo, a mensagem de erro deve apagar', () => {
    const { getByText, getByPlaceholderText, queryByText } = criaPost(1, '');

    fireEvent.change(getByPlaceholderText(/novo post/i), { target: { value: 'teste' } });
    
    fireEvent.click(getByText(/adicionar/i));

    expect(queryByText(/não é possível criar um post vazio/i)).not.toBeInTheDocument();
  })
});

describe("Ao criar 3 posts", () => {
  test('espero que apareça Quantidade de posts: 3', () => {
    const { getByText } = criaPost(3, 'teste');

    expect(getByText(/quantidade de posts: 3/i)).toBeInTheDocument();
  })
});