export class User {
  private id:string;
  private name:string;
  private email:string;
  private password:string;

  constructor(
    id:string,
    email:string,
    name:string,
    password:string
  ){
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
  }

  public getId = ():string => {
    return this.id;
  }
  public getEmail = ():string => {
    return this.email;
  }
  public getName = ():string => {
    return this.name;
  }
  public introduceYourself = ():string => {
    return `Olá, sou ${this.name} bom dia!`;
  }
}