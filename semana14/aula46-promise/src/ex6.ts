import axios from 'axios';

// a. Ela bate no endpoint para todas as requisições que está na array.
// b. A vantagem é que não é necessário esperar a resposta de cada requisição para fazer a próxima, pode fazer cada solicitação
// e aguardar as respostas.
// c.

const baseUrl:string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

type Subscriber = {
  id: string,
  name: string,
  email: string
}
  
const getAllSubscribers = async ():Promise<Subscriber[]> => {
  const subscribers = await axios.get(`${baseUrl}/subscribers/all`);
  return subscribers.data.map((item:Subscriber) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email
    }
  });
}

const sendNotification = async (subscribers:Subscriber[], message:string):Promise<void> => {
  const promiseArray:Promise<any>[] = [];
  for (const item of subscribers) {
    const subscriberId = item.id;
    promiseArray.push(axios.post(`${baseUrl}/notifications/send`, { subscriberId, message }));
  }
  await Promise.all(promiseArray);
}

const main = async ():Promise<void> => {
  try {
    const allSubscribers = await getAllSubscribers();
    await sendNotification(allSubscribers, 'Bem-vindos!');
    console.log('Todas as notificações enviadas com sucesso')
  } catch (err) {
    console.error(err);
  }
}

main();