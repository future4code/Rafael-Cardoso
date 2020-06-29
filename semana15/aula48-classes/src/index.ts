import { UserAccount } from './UserAccount';
import { JSONFileManager } from './JSONFileManager';
import { Bank } from './Bank';

const fileManager = new JSONFileManager('dataBase.json');
const accounts:UserAccount[] = fileManager.getObjectFromFile()
const f4Bank = new Bank(accounts, fileManager);

const newAccount = new UserAccount('222222222-22', 'Ela', 26);

// f4Bank.createAccount(newAccount);
// console.log(f4Bank.getAccountByCpfAndName('111111111-22','El'));

// f4Bank.addBalanceToAccount('111111111-11', 'Eu', 100);

f4Bank.pressAllAccounts();