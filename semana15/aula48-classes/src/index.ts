import { UserAccount } from './UserAccount';
import { JSONFileManager } from './JSONFileManager';
import { Bank } from './Bank';

const fileManager = new JSONFileManager('dataBase.json');
const f4Bank = new Bank([], fileManager);

f4Bank.createAccount(new UserAccount('222.222.222-22', 'Ela', 26));
f4Bank.createAccount(new UserAccount('111.111.111-11', 'Eu', 30));
f4Bank.createAccount(new UserAccount('999.999.999-99', 'Ele', 57));
f4Bank.createAccount(new UserAccount('555.555.555-55', 'Tu', 19));
// console.log(f4Bank.getAllAccounts());

f4Bank.addBalanceToAccount('111.111.111-11', 'Eu', 100);
f4Bank.addBalanceToAccount('222.222.222-22', 'Ela', 50);
f4Bank.addBillToAccount('999.999.999-99', 'Ele', 20, 'Cachaça');
f4Bank.addBalanceToAccount('999.999.999-99', 'Ele', 20);
f4Bank.addBillToAccount('222.222.222-22', 'Ela', 40, 'Mercado');
f4Bank.addBillToAccount('111.111.111-11', 'Eu', 20, 'Celular', '02/07/2020');
f4Bank.performTransfer('111.111.111-11', 'Eu', '555.555.555-55', 'Tu', 30);
f4Bank.performTransfer('222.222.222-22', 'Ela', '555.555.555-55', 'Tu', 20);
