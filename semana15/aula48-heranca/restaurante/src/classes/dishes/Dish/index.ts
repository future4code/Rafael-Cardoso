export abstract class Dish {
  protected name:string;
  protected price:number;
  protected cost:number;
  protected ingredients:string[];
  protected timeToCook:number;

  constructor(
    name:string,
    price:number,
    cost:number,
    ingredients:string[],
    timeToCook:number
  ) {
    this.name = name;
    this.price = price;
    this.cost = cost;
    this.ingredients = ingredients;
    this.timeToCook = timeToCook;
  }

  public getName = ():string => {
    return this.name;
  }
  public getPrice = ():number => {
    return this.price;
  }
  public getCost = ():number => {
    return this.cost;
  }
  public getIngredients = ():string[] => {
    return this.ingredients;
  }
  public getTimeToCook = ():number => {
    return this.timeToCook;
  }
  public getProfit():number {
    return this.price - this.cost;
  }
}
