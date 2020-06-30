import { Dish } from "../Dish";

export class Dessert extends Dish {
  private slicesNumber:number;
  constructor(
    name:string,
    price:number,
    cost:number,
    ingredients:string[],
    timeToCook:number,
    slicesNumber:number
  ) {
    super(name, price, cost, ingredients, timeToCook);
    this.slicesNumber = slicesNumber;
  }

  public getSlicesNumber = ():number => {
    return this.slicesNumber;
  }
  public getSlicePrice():number {
    return this.price / this.slicesNumber;
  }
  public cook():void {
    console.log("Baking Dessert");
  }
}
