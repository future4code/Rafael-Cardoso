export class Employee {
  protected name:string;
  protected salary:number;

  constructor(name:string, salary:number) {
    this.name = name,
    this.salary = salary
  }

  public getName = ():string => {
    return this.name;
  }
  public getSalary = ():number => {
    return this.salary;
  }
  protected sayJob = ():string => {
    return 'Meu cargo';
  }
}