import { Employee } from '../Employee';

export class Seller extends Employee {
  static SELLING_COMISSION:number = 5;
  private salesQuantity:number = 0;

  public getSalesQuantity = ():number => {
    return this.salesQuantity;
  }
  public setSalesQuantity = (quantity:number):void => {
    this.salesQuantity = quantity;
  }
  public calculateTotalSalary = ():number => {
    return this.baseSalary + Employee.BENEFITS_VALUE + Seller.SELLING_COMISSION * this.salesQuantity;
  }
}