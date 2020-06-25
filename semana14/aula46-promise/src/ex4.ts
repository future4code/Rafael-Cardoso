import axios from 'axios';

// a. Deve ser uma função que recebe como parâmetros os dados necessários para compor o body do endpoint sem retornar nada.
// b. 

const baseUrl:string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

const createNews = async (title:string, content:string, date:number):Promise<void> => {
  axios.put(`${baseUrl}/news`, { title, content, date });
}

const main = async ():Promise<void> => {
  try {
    await createNews('Nova notícia', 'Sempre uma novidade', 1590522289000);
    console.log('Notícia criada com sucesso!');
  } catch (err) {
    console.error(err);
  }
}

main();