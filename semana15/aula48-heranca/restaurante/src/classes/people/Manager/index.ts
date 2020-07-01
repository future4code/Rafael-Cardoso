import { Cashier } from '../Cashier';

export class Manager extends Cashier {
  public sayJob = ():string => {
    return 'Gerente';
  }
}