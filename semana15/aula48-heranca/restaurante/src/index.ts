import { Menu } from './classes/dishes/Menu';
import { MainCourse } from './classes/dishes/MainCourse';
import { Dessert } from './classes/dishes/Dessert';
import { Cashier } from './classes/people/Cashier';
import { Manager } from './classes/people/Manager';
import { Chef } from './classes/people/Chef';

const feijoada:MainCourse = new MainCourse('Feijoada', 30, 20, ['Linguiça', 'Feijão Preto', 'Bisteca'], 20);
const viradoAPaulista:MainCourse = new MainCourse('Virada à Paulista', 25, 18, ['Bisteca', 'Tutu', 'Torresmo'], 15);
const boloCenoura:Dessert = new Dessert('Bolo de Cenoura', 40, 15, ['Cenoura', 'Chocolate'], 40, 8);
const pudim:Dessert = new Dessert('Pudim', 30, 12, ['Leite condensado', 'Açúcar'], 30, 4);

export const menu:Menu = new Menu();
menu.includeNewDish(feijoada);
menu.includeNewDish(viradoAPaulista);
menu.includeNewDish(boloCenoura);
menu.includeNewDish(pudim);

const myChef:Chef = new Chef('José', 2000);

myChef.removeDishFromMenu('Feijoada');