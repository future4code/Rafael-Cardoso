import * as moment from 'moment';
import { User } from '../User';
import { FileManager } from '../FileManager';

export enum TEACHER_SPECIALTY {
  REACT = 'REACT',
  REDUX = 'REDUX',
  CSS = 'CSS',
  TESTES = 'TESTES',
  TYPESCRIPT = 'TYPESCRIPT',
  OOP = 'OOP',
  BACKEND = 'BACKEND'
}

export class Teacher implements User {
  constructor(
    public id:string,
    public name:string,
    public email:string,
    public birthDate:moment.Moment,
    public specialties:TEACHER_SPECIALTY[]
  ) {
    this.updateTeachersJSON();
  }

  public getAge = ():number => moment().diff(this.birthDate, 'years');

  private updateTeachersJSON = ():void => {
    const fm:FileManager = new FileManager('teachers.json');
    const teachers:any[] = fm.readFile();
    const foundTeacher = teachers.find((item:User) => item.id === this.id);
    if (foundTeacher) {
      return;
    }
    teachers.push(this);
    fm.writeFile(teachers);
  }
}