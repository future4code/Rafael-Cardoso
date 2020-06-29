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

  public getBalance():number {
    return this.balance;
  }

  public getAge():number {
    return this.age;
  }

  public getCpf():string {
    return this.cpf;
  }

  public getName():string {
    return this.name;
  }

  public addBalance(value:number, isTransfer?:boolean):UserAccount {
    const description = isTransfer ? 'Transferência de dinheiro recebida' : 'Depósito de dinheiro';
    const newTransaction = new Transaction(moment().format('DD/MM/YYYY'), value, description);
    this.transactions.push(newTransaction);
    this.balance += value;
    console.log('Saldo atualizado com sucesso');
    return this;
  }

  public payBill(value:number, description:string):UserAccount {
    const newTransaction = new Transaction(moment().format('DD/MM/YYYY'), -value, description);
    this.transactions.push(newTransaction);
    console.log(this.transactions);
    console.log('Conta incluída para ser paga com sucesso!');
    return this;
  }
}