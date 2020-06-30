import * as moment from 'moment';
import { Transaction } from './Transaction';

export class UserAccount {
  private cpf:string;
  private name:string;
  private age:number;
  private balance:number = 0;
  private transactions:Transaction[] = [];

  constructor (
    cpf:string,
    name:string,
    age:number,
  ) {
    this.cpf = cpf;
    this.name = name;
    this.age = age;
  }

  public getBalance = ():number => {
    return this.balance;
  }

  public getAge = ():number => {
    return this.age;
  }

  public getCpf = ():string => {
    return this.cpf;
  }

  public getName = ():string => {
    return this.name;
  }

  public addBalance = (value:number, isTransfer?:boolean):void => {
    const description = isTransfer ? 'Transferência de dinheiro recebida' : 'Depósito de dinheiro';
    const newTransaction = new Transaction(moment().format('DD/MM/YYYY'), value, description);
    this.transactions.push(newTransaction);
    this.balance += value;
  }

  public payBill = (value:number, description:string, date:string):void => {
    if (value > this.balance) {
      console.log('Não pode ser paga uma conta maior que seu saldo atual');
      return
    }
    if (moment(date, 'DD/MM/YYYY').diff(moment(), 'days') < 0) {
      console.log('Não é possível definir uma data anterior ao dia de hoje');
      return
    }
    const newTransaction = new Transaction(date, -value, description);
    this.transactions.push(newTransaction);
  }

  public updateBalance = ():void => {
    let actualBalance:number = 0;
    this.transactions.forEach((item:Transaction) => {
      if (moment(item.getDate(), 'DD/MM/YYYY').diff(moment(), 'days') <= 0) {
        actualBalance += item.getValue();
      }
    })
    this.balance = actualBalance;
  }
}