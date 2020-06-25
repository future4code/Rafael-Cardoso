import axios from 'axios';

// a. Não é recomendável o uso de nenhum método de array, como forEach, map e outros, com Promises, não se comportam bem.
// b. 

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
  for (const item of subscribers) {
    const subscriberId = item.id;
    await axios.post(`${baseUrl}/notifications/send`, { subscriberId, message });
    console.log(`Notificação enviada com sucesso para ${item.name}`);
  }
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