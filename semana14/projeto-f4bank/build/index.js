"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var moment = require("moment");
moment.locale('pt-br');
var fileName = 'dataBase.json';
var getAllAccounts = function () {
    var data = fs.readFileSync(fileName);
    var accounts;
    data.toString() ? accounts = JSON.parse(data.toString()) : accounts = [];
    return accounts;
};
var createAccount = function (name, cpf, birthDate) {
    var accounts = getAllAccounts();
    var age = moment().diff(moment(birthDate, 'DD/MM/YYYY'), 'years');
    for (var _i = 0, accounts_1 = accounts; _i < accounts_1.length; _i++) {
        var item = accounts_1[_i];
        if (item.cpf === cpf) {
            console.log('Só é possível ter uma conta para cada CPF.');
            return;
        }
    }
    if (age >= 18) {
        var newAccount = { name: name, cpf: cpf, birthDate: birthDate, balance: 0, transactions: [] };
        accounts.push(newAccount);
        fs.writeFileSync(fileName, JSON.stringify(accounts, null, 2));
        console.log('Conta criada com sucesso.');
    }
    else {
        console.log('Só é possível criar uma conta para quem tiver mais de 18 anos.');
    }
};
var getBalance = function (name, cpf) {
    var accounts = getAllAccounts();
    for (var _i = 0, accounts_2 = accounts; _i < accounts_2.length; _i++) {
        var item = accounts_2[_i];
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
var addBalance = function (name, cpf, value) {
    var accounts = getAllAccounts();
    var actualBalance = getBalance(name, cpf);
    if (actualBalance === undefined) {
        return;
    }
    var updatedAccounts = accounts.map(function (item) {
        if (item.name === name && item.cpf === cpf) {
            var newTransaction = { value: value, date: moment().format('DD/MM/YYYY'), description: 'Depósito de dinheiro' };
            var allTransactions = item.transactions;
            allTransactions.push(newTransaction);
            return __assign(__assign({}, item), { balance: actualBalance + value, transactions: allTransactions });
        }
        return item;
    });
    fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
    console.log('Valor adicionado com sucesso!');
};
var payBill = function (name, cpf, value, description, dateToPay) {
    var accounts = getAllAccounts();
    var actualBalance = getBalance(name, cpf);
    var date = dateToPay || moment().format('DD/MM/YYYY');
    if (moment(date, 'DD/MM/YYYY').diff(moment(), 'days') < 0) {
        console.log('Não é possível definir uma data anterior ao dia de hoje');
        return;
    }
    if (actualBalance === undefined) {
        return;
    }
    var balanceExceeded = false;
    var updatedAccounts = accounts.map(function (item) {
        if (item.name === name && item.cpf === cpf) {
            if (item.balance < value) {
                balanceExceeded = true;
                return item;
            }
            else {
                var newTransaction = { value: -value, date: date, description: description };
                var allTransactions = item.transactions;
                allTransactions.push(newTransaction);
                return __assign(__assign({}, item), { transactions: allTransactions });
            }
        }
        return item;
    });
    if (balanceExceeded) {
        console.log('Não pode ser paga uma conta maior que seu saldo atual');
        return;
    }
    fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
    console.log('Conta incluída com sucesso!');
};
var updateBalance = function () {
    var accounts = getAllAccounts();
    var updatedAccounts = accounts.map(function (item) {
        var newBalance = 0;
        item.transactions.forEach(function (item) {
            if (moment(item.date, 'DD/MM/YYYY').diff(moment(), 'days') <= 0) {
                newBalance += item.value;
            }
        });
        return __assign(__assign({}, item), { balance: newBalance });
    });
    fs.writeFileSync(fileName, JSON.stringify(updatedAccounts, null, 2));
    console.log('Contas atualizada com sucesso!');
};
payBill('Ela', '211111111-11', 40, 'Lanche');
//# sourceMappingURL=index.js.map