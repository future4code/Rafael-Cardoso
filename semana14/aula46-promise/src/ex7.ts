import axios from 'axios';

const baseUrl:string = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';

type Subscriber = {
  id:string,
  name:string,
  email:string
}

type Notification = {
  id:string,
  subscriberId:string,
  message:string
}

const createUser = async (name:string, email:string):Promise<void> => {
  await axios.put(`${baseUrl}/subscribers`, { name, email });
}

const createNews = async (title:string, content:string, date:number):Promise<void> => {
  axios.put(`${baseUrl}/news`, { title, content, date });
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

const createAndSendNotifications = async (title:string, content:string, date:number, message:string):Promise<void> => {
  await createNews(title, content, date);
  const allSubscribers = await getAllSubscribers();
  await sendNotification(allSubscribers, message);
}

const getAllNotifications = async ():Promise<Notification[]> => {
  const allSubscribers = await getAllSubscribers();
  const notificationsArray:Promise<any>[] = [];
  for (const item of allSubscribers) {
    notificationsArray.push(axios.get(`${baseUrl}/subscribers/${item.id}/notifications/all`));
  }
  const notifications = await Promise.all(notificationsArray);
  return notifications.map(item => item.data);

}

const main = async ():Promise<void> => {
  try {
    createUser('eu', 'eu@eu.com');
    console.log('Usuário criado com sucesso');
    createAndSendNotifications('Boas novas', 'Sempre novidades', 1590522289000, 'Bem-vindos!');
    console.log('Notícia criada e enviada com sucesso');
    console.log(await getAllNotifications());
  } catch (err) {
    console.error(err);
  }
}

main();