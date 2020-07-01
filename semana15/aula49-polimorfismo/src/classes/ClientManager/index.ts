import { Client } from '../Client';

export class ClientManager {
  constructor(private clients:Client[]) {}

  public getAllClients = ():Client[] => this.clients;

  public getClientsQuantity = ():number => this.clients.length;

  public registerClient = (client:Client):void => {
    this.clients.push(client);
  }

  public calculateBillOfClient = (registrationNumber:number):number => {
    const foundClient:Client|undefined = this.clients.find((item:Client) => item.registrationNumber === registrationNumber);
    if (foundClient) {
      return foundClient.calculateBill();
    }
    console.log('Não foi possível encontrar cliente procurado.');
    return 0;
  }

  public calculateTotalIncome = ():number => {
    let totalIncome:number = 0;
    this.clients.forEach((item:Client) => {
      totalIncome += item.calculateBill();
    });
    return totalIncome;
  }

  public deleteUser = (registrationNumber:number):void => {
    const updatedClients:Client[] = this.clients.filter((item:Client) => item.registrationNumber !== registrationNumber);
    if (updatedClients.length === this.clients.length) {
      console.log('Não foi possível encontrar cliente procurado.');
      return;
    }
    this.clients = updatedClients;
  }

  public printClients = ():void => {
    this.clients.forEach((item:Client) => {
      console.log(`${item.name} - ${item.registrationNumber} - ${item.consumedEnergy}kWh - R$${item.calculateBill().toFixed(2)}`);
    });
  }
}