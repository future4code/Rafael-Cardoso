import * as moment from 'moment';
import { User } from '../User';
import { FileManager } from '../FileManager';

export class Student implements User {
  constructor(
    public id:string,
    public name:string,
    public email:string,
    public birthDate:moment.Moment,
    public hobbies:string[]
  ) {
    this.updateStudentsJSON();
  }

  public getAge = ():number => moment().diff(this.birthDate, 'years');

  private updateStudentsJSON = ():void => {
    const fm:FileManager = new FileManager('students.json');
    const students:any[] = fm.readFile();
    const foundStudent = students.find((item:User) => item.id === this.id);
    if (foundStudent) {
      return;
    }
    students.push(this);
    fm.writeFile(students);
  }
}