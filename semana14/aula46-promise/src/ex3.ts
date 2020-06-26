import axios from 'axios';

// a. Sem fazer o mapeamento no return, teria que informar o tipo de retorno da Promise como any para não haver problema.
// b. Sempre fazemos isso para garantir que a função retorne sempre no tipo indicado na função.
// c.

const baseUrl: string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

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

const main = async ():Promise<void> => {
  try {
    const allSubscribers = await getAllSubscribers();
    console.log(allSubscribers);
  } catch (err) {
    console.error(err);
  }
}

main();