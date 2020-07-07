import { ClientManager } from './classes/ClientManager';
import { ResidentialClient } from './classes/ResidentialClient';
import { CommercialClient } from './classes/CommercialClient';
import { IndustrialClient } from './classes/IndustrialClient';
import { Client } from './classes/Client';

// const newResidence:Residence = new Residence(3, '00000-000');
// const newCommerce:Commerce = new Commerce(10, '11111-111');
// const newIndustry:Industry = new Industry(5, '99999-999');

// console.log(`O cep de residência que tem ${newResidence.getResidentsQuantity()} pessoas é ${newResidence.getCep()}`);
// console.log(`O cep do comércio que tem ${newCommerce.getFloorsQuantity()} andares é ${newCommerce.getCep()}`);
// console.log(`O cep de indústria que tem ${newIndustry.getMachinesQuantity()} máquinas é ${newIndustry.getCep()}`);

const clientManager = new ClientManager([]);

const residentialClient:Client = new ResidentialClient('111.111.111-11', 'Zezinho', Number((Date.now() * Math.random()).toFixed(0)), 200, 4, '00000-000');
clientManager.registerClient(residentialClient);

const commercialClient:Client = new CommercialClient('00.000.000/0001-00', 'Lujinha', Number((Date.now() * Math.random()).toFixed(0)), 500, 2, '12345-678');
clientManager.registerClient(commercialClient);

const industrialClient:Client = new IndustrialClient('1234567890', 'Fabriqueta', Number((Date.now() * Math.random()).toFixed(0)), 1000, 5, '99999-99');
clientManager.registerClient(industrialClient);

// console.log(clientManager);

// console.log(clientManager.calculateBillOfClient(industrialClient.registrationNumber));
// console.log(clientManager.calculateBillOfClient(123456));
// console.log(clientManager.calculateTotalIncome());

// clientManager.deleteUser(residentialClient.registrationNumber);
// clientManager.deleteUser(123456);

// console.log(clientManager);

// clientManager.printClients();

