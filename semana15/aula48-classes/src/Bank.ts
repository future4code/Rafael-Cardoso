import { UserAccount } from './UserAccount';
import { JSONFileManager } from './JSONFileManager';

export class Bank {
  private accounts:UserAccount[];
  private fileManager:JSONFileManager;

  constructor(accounts:UserAccount[], fileManager:JSONFileManager) {
    this.accounts = accounts;
    this.fileManager = fileManager;
  }

  public createAccount = (userAccount: UserAccount): void => {
    const accounts:any[] = this.getAllAccounts().map((item:any) => new UserAccount(item.cpf, item.name, item.age));
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

  public getAllAccounts = ():UserAccount[] => {
    return this.fileManager.getObjectFromFile();
  }

  public pressAllAccounts = ():void => {
    const accounts:UserAccount[] = this.getAllAccounts().map((item:any) => new UserAccount(item.cpf, item.name, item.age));
    accounts.forEach((item:any) => {
      console.log(`Nome: ${item.getName()}`);
      console.log(`CPF: ${item.getCpf()}`);
      console.log(`Saldo: R$${item.getBalance().toFixed(2)}`);
    })
  }

  public getAccountByCpfAndName = (cpf: string, name: string):UserAccount|undefined => {
    const accounts:UserAccount[] = this.getAllAccounts();
    const accountToReturn:UserAccount[] = accounts.filter((item:any) => (
      item.cpf === cpf && item.name === name
    ))
    if (accountToReturn.length === 0) {
      console.log('Não foi encontrada nenhuma conta com esses dados, favor verifique se eles estão corretos.')
      return undefined;
    }
    return accountToReturn[0];
  }

  public addBalanceToAccount = (cpf:string, name:string, value:number):void => {
    const accounts:object[] = this.getAllAccounts();
    const account:UserAccount|undefined = this.getAccountByCpfAndName(cpf, name);
    if (account === undefined) {
      return;
    }
    const updatedAccount:UserAccount = account.addBalance(value);
    const accountsToSave:object[] = accounts.map((item:any) => {
      if (item.cpf === cpf) {
        return updatedAccount;
      }
      return item;
    });
    this.fileManager.writeObjectToFile(accountsToSave);
  }

  public addBillToAccount = (cpf:string, name:string, value: number, description:string):void => {
    const accounts:object[] = this.getAllAccounts();
    const account:UserAccount|undefined = this.getAccountByCpfAndName(cpf, name);
    if (account === undefined) {
      return;
    }
    const updatedAccount:object = account.payBill(value, description);
    const accountsToSave:object[] = accounts.map((item:any) => {
      if (item.cpf === cpf) {
        return updatedAccount;
      }
      return item;
    });
    // console.log(accountsToSave);
  }
}