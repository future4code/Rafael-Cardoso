import * as moment from 'moment';

moment.locale('pt-br');

type event = {
  name: string,
  description: string,
  startsAt: moment.Moment,
  finishesAt: moment.Moment
}

const allEvents: event[] = [
	{
		name: "Reunião",
		description: "Reunião muito importante",
		startsAt: moment("25/06/2020 15:00", "DD/MM/YYYY HH:mm"),
	 	finishesAt: moment("25/06/2020 16:00", "DD/MM/YYYY HH:mm")
	},
	{
		name: "Reuniãozinha",
		description: "Reunião não muito importante",
		startsAt: moment("26/06/2020 17:00", "DD/MM/YYYY HH:mm"),
	 	finishesAt: moment("26/06/2020 18:00", "DD/MM/YYYY HH:mm")
	}
];

const printEvents = (events: event[]): void => {
  events.forEach((item: event) => {
    const duration: number = item.finishesAt.diff(item.startsAt, 'minutes');
    const daysToEvent: number = item.startsAt.diff(moment(), 'days');
    const eventInfo: string = `
    Nome: ${item.name}
    Horário de início: ${item.startsAt.format('dddd, DD [de] MMMM [de] YYYY, HH:mm')}
    Horário de fim: ${item.finishesAt.format('DD [de] MMMM [de] YYYY, HH:mm')}
    Descrição: ${item.description}
    Duração: ${duration} min
    Dias até o evento: ${daysToEvent} dias`;
    console.log(eventInfo);
  })
}

const createEvent = (
  name: string,
  description: string,
  startsAt: moment.Moment,
  finishesAt: moment.Moment
): void => {
  if (!name || !description || !startsAt || !finishesAt) {
    console.log('Favor insira todos os dados válidos!');
    return;
  }
  const diffStartsToToday: number = startsAt.diff(moment(), 'seconds');
  const diffFinishesToToday: number = finishesAt.diff(moment(), 'seconds');
  if (diffStartsToToday < 0 && diffFinishesToToday < 0) {
    console.log('Favor insira datas não anteriores a presente!');
    return;
  }
  const newEvent: event = {
    name,
    description,
    startsAt,
    finishesAt
  };
  allEvents.push(newEvent);
}

createEvent(
  'Festa', 
  'Festa de aniversário especial', 
  moment("30/06/2020 12:00", "DD/MM/YYYY HH:mm"), 
  moment("30/06/2020 18:00", "DD/MM/YYYY HH:mm"
));

printEvents(allEvents);