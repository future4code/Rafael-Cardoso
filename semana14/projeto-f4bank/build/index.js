"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const moment = require("moment");
moment.locale('pt-br');
const fileName = 'dataBase.json';
const getAllAccounts = () => {
    const data = fs.readFileSync(fileName);
    let accounts;
    data.toString() ? accounts = JSON.parse(data.toString()) : accounts = [];
    return accounts;
};
const createAccount = (name, cpf, birthDate) => {
    const accounts = getAllAccounts();
    const age = moment().diff(moment(birthDate, 'DD/MM/YYYY'), 'years');
    for (const item of accounts) {
        if (item.cpf === cpf) {
            console.log('Só é possível ter uma conta para cada CPF.');
            return;
        }
    }
    if (age >= 18) {
        const newAccount = { name, cpf, birthDate, balance: 0, transactions: [] };
        accounts.push(newAccount);
        fs.writeFileSync(fileName, JSON.stringify(accounts, null, 2));
        console.log('Conta criada com sucesso.');
    }
    else {
        console.log('Só é possível criar uma conta para quem tiver mais de 18 anos.');
    }
};
const getBalance = (name, cpf) => {
    const accounts = getAllAccounts();
    for (const item of accounts) {
        if (item.cpf === cpf) {
            if (item.name === name) {
                return item.balance;
            }
            else {
                console.log('Favor informe os dados corretamente.');
                return undefined;
            }
        }
    }
    console.log('Ainda não tem ninguém cadastrado com esses dados.');
    return undefined;
};
const addBalance = (name, cpf, value, isTransfer) => {
    const accounts = getAllAccounts();
    const actualBalance = getBalance(name, cpf);
    const description = isTransfer ? 'Transferência de dinheiro recebido' : 'Depósito de dinheiro';
    if (actualBalance === undefined) {
        return;
    }
    const updatedAccounts = accounts.map((item) => {
        if (item.name === name && item.cpf === cpf) {
            const newTransaction = { value, date: moment().format('DD/MM/YYYY'), description };
            const allTransactions = item.transactions;
            allTransactions.push(newTransaction);
            return Object.assign(Object.assign({}, item), { balance: actualBalance + value, transactions: allTransactions });
        }
        return item;
    });
    fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
    console.log('Valor adicionado com sucesso!');
};
const payBill = (name, cpf, value, description, dateToPay) => {
    const accounts = getAllAccounts();
    const actualBalance = getBalance(name, cpf);
    const date = dateToPay || moment().format('DD/MM/YYYY');
    if (actualBalance === undefined) {
        return;
    }
    if (actualBalance < value) {
        console.log('Não pode ser paga uma conta maior que seu saldo atual');
        return;
    }
    if (moment(date, 'DD/MM/YYYY').diff(moment(), 'days') < 0) {
        console.log('Não é possível definir uma data anterior ao dia de hoje');
        return;
    }
    const updatedAccounts = accounts.map((item) => {
        if (item.name === name && item.cpf === cpf) {
            const newTransaction = { value: -value, date, description };
            const allTransactions = item.transactions;
            allTransactions.push(newTransaction);
            return Object.assign(Object.assign({}, item), { transactions: allTransactions });
        }
        return item;
    });
    fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
    console.log('Conta incluída com sucesso!');
};
const updateBalance = () => {
    const accounts = getAllAccounts();
    const updatedAccounts = accounts.map((item) => {
        let newBalance = 0;
        item.transactions.forEach((item) => {
            if (moment(item.date, 'DD/MM/YYYY').diff(moment(), 'days') <= 0) {
                newBalance += item.value;
            }
        });
        return Object.assign(Object.assign({}, item), { balance: newBalance });
    });
    fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
    console.log('Contas atualizada com sucesso!');
};
const performTransfer = (senderName, senderCpf, receiverName, receiverCpf, value) => {
    const senderBalance = getBalance(senderName, senderCpf);
    const receiverBalance = getBalance(receiverName, receiverCpf);
    console.log(senderBalance, receiverBalance);
    if (senderBalance === undefined || receiverBalance === undefined) {
        console.log('Insira usuários válidos para transferência.');
        return;
    }
    if (senderBalance < value) {
        console.log('O emissor deve ter saldo maior que o valor desejado.');
        return;
    }
    addBalance(receiverName, receiverCpf, value, true);
    payBill(senderName, senderCpf, value, 'Transferência de dinheiro enviado');
    updateBalance();
    console.log('Transferência realizada com sucesso.');
};
performTransfer('Eu', '111111111-11', 'Ele', '111111111-22', 20);
//# sourceMappingURL=index.js.map