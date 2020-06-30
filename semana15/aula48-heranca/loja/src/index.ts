import { User } from './classes/User';
import { Customer } from './classes/Customer';
import { Employee } from './classes/Employee';
import { Seller } from './classes/Seller';

const newUser:User = new User(`${Date.now()}${Math.random()}`, 'eu@eu.com', 'Eu', 'qwerty');

// console.log(`O id do usuário é: ${newUser.getId()}`);
// console.log(`O nome do usuário é: ${newUser.getName()}`);
// console.log(`O email do usuário é: ${newUser.getEmail()}`);

const newCustomer = new Customer(`${Date.now()}${Math.random()}`, 'tu@tu.com', 'Tu', 'asdfgh', '1111222233334444');

// console.log(newCustomer.introduceYourself());
// console.log(`O id do consumidor é ${newCustomer.getId()}`);
// console.log(`O nome do consumidor é ${newCustomer.getName()}`);
// console.log(`O email do consumidor é ${newCustomer.getEmail()}`);
// console.log(`O cartão de crédito do consumidor é ${newCustomer.getCreditCard()}`);
// console.log(`O valor total de compras do consumidor é ${newCustomer.purchaseTotal}`);

const newEmployee = new Employee(`${Date.now()}${Math.random()}`, 'ele@ele.com', 'Ele', 'zxcvbn', '01/01/2020', 1000);

// console.log(`O id do funcionário é ${newEmployee.getId()}`);
// console.log(`O nome do funcionário é ${newEmployee.getName()}`);
// console.log(`O email do funcionário é ${newEmployee.getEmail()}`);
// console.log(`A data de admissão do funcionário é ${newEmployee.getAdmissionDate()}`);
// console.log(`O salário base do funcionário é ${newEmployee.getBaseSalary()}`);
// console.log(`O salário total do funcionário é ${newEmployee.calculateTotalSalary()}`);

const newSeller = new Seller(`${Date.now()}${Math.random()}`, 'ela@ela.com', 'Ela', '123456', '01/01/2019', 1000);

// console.log(`O id da vendedora é ${newSeller.getId()}`);
// console.log(`O nome da vendedora é ${newSeller.getName()}`);
// console.log(`O email da vendedora é ${newSeller.getEmail()}`);
// console.log(`A data de admissão da vendedora é ${newSeller.getAdmissionDate()}`);
// console.log(`O salário base da vendedora é ${newSeller.getBaseSalary()}`);
// console.log(`O salário total da vendedora é ${newSeller.calculateTotalSalary()}`);
// newSeller.setSalesQuantity(2);
// console.log(`A quantidade de vendas da vendedora é ${newSeller.getSalesQuantity()}`);

const newNewSeller = new Seller(`${Date.now()}${Math.random()}`, 'voce@voce.com', 'Você', '987654', '01/07/2019', 1000);

newNewSeller.setSalesQuantity(4);
console.log(`O salário total da vendedora é ${newNewSeller.calculateTotalSalary()}`);