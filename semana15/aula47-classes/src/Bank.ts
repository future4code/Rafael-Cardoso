import * as moment from 'moment';
import { UserAccount } from './UserAccount';
import { JSONFileManager } from './JSONFileManager';

export class Bank {
  private accounts:UserAccount[];
  private fileManager:JSONFileManager;

  constructor(accounts:UserAccount[], fileManager:JSONFileManager) {
    this.accounts = accounts;
    this.fileManager = fileManager;
  }

  public getAllAccounts = ():UserAccount[] => {
    return this.accounts;
  }

  public createAccount = (userAccount: UserAccount): void => {
    const accounts:any[] = this.getAllAccounts();
    const foundCpf = accounts.find((item:UserAccount) => {
      return item.getCpf() === userAccount.getCpf();
    })
    if (foundCpf !== undefined) {
      console.log('Só é possível ter uma conta para cada CPF.');
      return
    }
    if (userAccount.getAge() < 18) {
      console.log('Só é possível criar uma conta para quem tiver mais de 18 anos.');
      return;
    }
    accounts.push(userAccount);
    this.fileManager.writeObjectToFile(accounts);
    console.log('Conta criada com sucesso.');
  }

  public pressAllAccounts = ():void => {
    const accounts:UserAccount[] = this.getAllAccounts();
    accounts.forEach((item:any) => {
      console.log(`Nome: ${item.getName()}`);
      console.log(`CPF: ${item.getCpf()}`);
      console.log(`Saldo: R$${item.getBalance().toFixed(2)}`);
    })
  }

  public getAccountByCpfAndName = (cpf: string, name: string):UserAccount|undefined => {
    const accounts:UserAccount[] = this.getAllAccounts();
    const accountToReturn:UserAccount[] = accounts.filter((item:UserAccount) => (
      item.getCpf() === cpf && item.getName() === name
    ))
    if (accountToReturn.length === 0) {
      console.log('Não foi encontrada nenhuma conta com esses dados, favor verifique se eles estão corretos.')
      return undefined;
    }
    return accountToReturn[0];
  }

  public updateAccountsBalance = ():void => {
    this.accounts.forEach((item:UserAccount) => {
      item.updateBalance();
    })
    console.log('OS saldos estão atualizados');
  }

  public addBalanceToAccount = (cpf:string, name:string, value:number):void => {
    const accounts:UserAccount[] = this.getAllAccounts();
    const account:UserAccount|undefined = this.getAccountByCpfAndName(cpf, name);
    if (account === undefined) {
      return;
    }
    account.addBalance(value);
    this.updateAccountsBalance();
    this.fileManager.writeObjectToFile(accounts);
    console.log('Depósito realizado com sucesso.');
  }

  public addBillToAccount = (cpf:string, name:string, value: number, description:string, dateToPay?:string):void => {
    const accounts:object[] = this.getAllAccounts();
    const account:UserAccount|undefined = this.getAccountByCpfAndName(cpf, name);
    if (account === undefined) {
      return;
    }
    const date = dateToPay || moment().format('DD/MM/YYYY');
    account.payBill(value, description, date);
    this.updateAccountsBalance();
    this.fileManager.writeObjectToFile(accounts);
    console.log('Conta incluída para ser paga com sucesso.');
  }

  public performTransfer = (senderCpf:string, senderName:string, receiverCpf:string, receiverName:string, value:number):void => {
    const accounts:UserAccount[] = this.getAllAccounts();
    const senderAccount:UserAccount|undefined = this.getAccountByCpfAndName(senderCpf, senderName);
    const receiverAccount:UserAccount|undefined = this.getAccountByCpfAndName(receiverCpf, receiverName);
    if (senderAccount === undefined || receiverAccount === undefined) {
      return;
    }
    if (senderAccount.getBalance() < value) {
      console.log('O emissor deve ter saldo maior que o valor desejado.');
      return;
    }
    senderAccount.payBill(value, 'Transferência de dinheiro enviado', moment().format('DD/MM/YYYY'));
    receiverAccount.addBalance(value, true);
    this.updateAccountsBalance();
    this.fileManager.writeObjectToFile(accounts);
    console.log('Transferência realizada com sucesso.');
  }
}