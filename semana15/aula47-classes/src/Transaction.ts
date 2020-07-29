export class Transaction {
  private date:string
  private value:number
  private description:string
  
  constructor (
    date:string,
    value:number,
    description:string
  ) {
    this.date = date;
    this.value = value;
    this.description = description;
  }

  public getDate = ():string => {
    return this.date;
  }

  public getValue = ():number => {
    return this.value;
  }

  public getDescription = ():string => {
    return this.description;
  }
}