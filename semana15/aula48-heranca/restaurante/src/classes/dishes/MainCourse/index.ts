import { Dish } from "../Dish";

export class MainCourse extends Dish {
  constructor(
    name:string,
    price:number,
    cost:number,
    ingredients:string[],
    timeToCook:number
  ) {
    super(name, price, cost, ingredients, timeToCook);
  }

  public cook():void {
    console.log("Starting Main Course");
  }
}
