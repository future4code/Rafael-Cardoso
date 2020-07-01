import { Employee } from '../Employee';
import { menu } from '../../../';

export class Chef extends Employee {
  public sayJob = ():string => {
    return 'Chefe de cozinha';
  }
  public removeDishFromMenu = (dishName:string):void => {
    const newDishesList = menu.getAllDishes().filter((item:any) => {
      return item.getName() !== dishName;
    });
    menu.setNewMenu(newDishesList);
  }
}