import * as fs from 'fs';
import * as moment from 'moment';

moment.locale('pt-br');

const fileName:string = 'dataBase.json';

// Declaração dos tipos
type Account = {
  name:string,
  cpf:string,
  birthDate:string,
  balance:number,
  transactions:Transaction[]
}

type Transaction = {
  value:number,
  date:string,
  description:string
}

// Função para pegar todas as contas
const getAllAccounts = ():Account[] => {
  const data:Buffer = fs.readFileSync(fileName);
  let accounts:any[];
  data.toString() ? accounts = JSON.parse(data.toString()) : accounts = [];
  return accounts;
}

// Função para criar nova conta
const createAccount = (name:string, cpf:string, birthDate:string):void => {
  const accounts:Account[] = getAllAccounts();
  const age:number = moment().diff(moment(birthDate, 'DD/MM/YYYY'), 'years');
  for (const item of accounts) {
    if (item.cpf === cpf) {
      console.log('Só é possível ter uma conta para cada CPF.');
      return
    }
  }
  if (age >= 18) {
    const newAccount:Account = { name, cpf, birthDate, balance: 0, transactions: []};
    accounts.push(newAccount);
    fs.writeFileSync(fileName, JSON.stringify(accounts, null, 2));
    console.log('Conta criada com sucesso.')
  } else {
    console.log('Só é possível criar uma conta para quem tiver mais de 18 anos.');
  }
}

// Função para pegar o saldo de uma dada conta
const getBalance = (name:string, cpf:string):number|undefined => {
  const accounts:Account[] = getAllAccounts();
  for (const item of accounts) {
    if (item.cpf === cpf) {
      if (item.name === name) {
        return item.balance;
      } else {
        console.log('Favor informe os dados corretamente.');
        return undefined;
      }
    }
  }
  console.log('Ainda não tem ninguém cadastrado com esses dados.');
  return undefined;
}

// Função que adiciona valor ao saldo
const addBalance = (name:string, cpf:string, value:number):void => {
  const accounts:Account[] = getAllAccounts();
  const actualBalance:number|undefined = getBalance(name, cpf);
  if (actualBalance === undefined) {
    return;
  }
  const updatedAccounts:Account[] = accounts.map((item:Account) => {
    if (item.name === name && item.cpf === cpf) {
      const newTransaction:Transaction = { value, date: moment().format('DD/MM/YYYY'), description: 'Depósito de dinheiro' };
      const allTransactions:Transaction[] = item.transactions;
      allTransactions.push(newTransaction);
      return { ...item, balance: actualBalance + value, transactions: allTransactions };
    }
    return item;
  });
  fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
  console.log('Valor adicionado com sucesso!');
}

// Função para pagar uma conta
const payBill = (name:string, cpf:string, value:number, description:string, dateToPay?:string):void => {
  const accounts:Account[] = getAllAccounts();
  const actualBalance:number|undefined = getBalance(name, cpf);
  const date = dateToPay || moment().format('DD/MM/YYYY');
  if (actualBalance === undefined) {
    return;
  }
  if (actualBalance < value) {
    console.log('Não pode ser paga uma conta maior que seu saldo atual');
    return
  }
  if (moment(date, 'DD/MM/YYYY').diff(moment(), 'days') < 0) {
    console.log('Não é possível definir uma data anterior ao dia de hoje');
    return
  }
  const updatedAccounts:Account[] = accounts.map((item:Account) => {
    if (item.name === name && item.cpf === cpf) {
      const newTransaction:Transaction = { value: -value, date, description };
      const allTransactions:Transaction[] = item.transactions;
      allTransactions.push(newTransaction);
      return { ...item, transactions: allTransactions };
    }
    return item;
  });
  fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
  console.log('Conta incluída com sucesso!');
}

// Função para atualizar o saldo de todas as contas
const updateBalance = ():void => {
  const accounts:Account[] = getAllAccounts();
  const updatedAccounts:Account[] = accounts.map((item:Account) => {
    let newBalance:number = 0;
    item.transactions.forEach((item:Transaction) => {
      if (moment(item.date, 'DD/MM/YYYY').diff(moment(), 'days') <= 0) {
        newBalance += item.value
      }
    });
    return { ...item, balance: newBalance }
  });
  fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
  console.log('Contas atualizada com sucesso!');
}

// Chamada das funções
// createAccount('Ele', '111111111-22', '01/01/2000');
// addBalance('Eu', "111111111-11", 100);
// payBill('Ela', '211111111-11', 40, 'Lanche');
// updateBalance();