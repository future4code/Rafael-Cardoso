import { Client } from '../Client';
import { Residence } from '../Residence';

export class ResidentialClient extends Residence implements Client {
  constructor(
    private cpf:string, 
    public name:string, 
    public registrationNumber:number, 
    public consumedEnergy:number, 
    residentsQuantity:number, 
    cep:string
  ) {
    super(residentsQuantity, cep);
  }

  public getCpf = ():string => this.cpf;

  public calculateBill = ():number => this.consumedEnergy * .75;
}