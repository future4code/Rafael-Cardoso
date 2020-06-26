import axios from 'axios';

// a. Deve ser utilizado o endpoint get /subscribers/all para ter acesso a todos os assinantes.
// b. async function functionName ():Promise<any[]>.
// c.

const baseUrl: string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

async function getAllSubscribers ():Promise<any[]> {
  const subscribers = await axios.get(`${baseUrl}/subscribers/all`);
  return subscribers.data.map((item:any) => {
    return {
      id: item.id,
      name: item.name,
      email: item.email
    }
  });
}

async function main ():Promise<void> {
  try {
    const allSubscribers = await getAllSubscribers();
    console.log(allSubscribers);
  } catch (err) {
    console.error(err);
  }
}

main();