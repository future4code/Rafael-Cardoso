import axios from 'axios';

// a. Na função nomeada, é declarado que é async antes de determinar que é function, na arrow declara async antes dos ().
// b. 

const baseUrl: string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

const getAllSubscribers = async ():Promise<any[]> => {
  const subscribers = await axios.get(`${baseUrl}/subscribers/all`);
  return subscribers.data.map((item:any) => {
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