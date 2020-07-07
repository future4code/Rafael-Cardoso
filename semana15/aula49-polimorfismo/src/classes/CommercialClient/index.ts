import { Client } from '../Client';
import { Commerce } from '../Commerce';

export class CommercialClient extends Commerce implements Client {
  constructor(
    private cnpj:string, 
    public name:string, 
    public registrationNumber:number, 
    public consumedEnergy:number, 
    floorsQuantity:number, 
    cep:string
  ) {
    super(floorsQuantity, cep);
  }

  public getCnpj = ():string => this.cnpj;

  public calculateBill = ():number => this.consumedEnergy * .53;
}