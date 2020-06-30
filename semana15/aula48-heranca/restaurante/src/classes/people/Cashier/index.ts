import { Employee } from '../Employee';
import { Dessert } from '../../dishes/Dessert';
import { MainCourse } from '../../dishes/MainCourse';

export class Cashier extends Employee {
  public sayJob = ():string => {
    return 'Caixa';
  }
  public calculateBill = (dishes:any[]):number => {
    let totalBill:number = 0;
    dishes.forEach((item:any) => {
      totalBill += item.getPrice();
    })
    return totalBill;
  }
}