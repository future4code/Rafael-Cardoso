import { MainCourse } from '../MainCourse';
import { Dessert } from '../Dessert';

export class Menu {
  private dishes:(MainCourse|Dessert)[] = [];

  getAllDishes = ():(MainCourse|Dessert)[] => {
    return this.dishes;
  }
  setNewMenu = (newMenu:(MainCourse|Dessert)[]):void => {
    this.dishes = newMenu;
  }
  includeNewDish = (newDish:MainCourse|Dessert):void => {
    this.dishes.push(newDish);
  }
}