import * as moment from 'moment';
import { User } from '../User';
import { FileManager } from '../FileManager';

export abstract class Mission {
  protected name:string = '';
  constructor(
    protected id:string,
    protected startDate:moment.Moment,
    protected endDate:moment.Moment,
    protected currentModule:number|undefined = undefined,
    protected teachers:User[] = [],
    protected students:User[] = []
  ) {
    this.updateMissionJSON();
  }

  public getId = ():string => this.id;

  public getName = ():string => this.name;

  public getStartDate = ():moment.Moment => this.startDate;

  public getEndDate = ():moment.Moment => this.endDate;

  public getCurrentModule = ():number|undefined => this.currentModule;

  public getTeachers = ():User[] => this.teachers;

  public getStudents = ():User[] => this.students;

  public addTeacher = (teacher:User):void => {
    this.teachers.push(teacher);
    this.updateMissionJSON();
  }

  public addStudent = (student:User):void => {
    this.students.push(student);
    this.updateMissionJSON();
  }

  public setName = (name:string):void => {
    this.name = name;
    this.updateMissionJSON();
  }

  public getStudentAgeById = (id:string):number|undefined => {
    const student:any|undefined = this.students.find((item:User) => item.id === id);
    if (!student) {
      console.log('Aluno não encontrado');
      return undefined;
    }
    return student.getAge();
  }

  protected updateMissionJSON = ():void => {
    const fm:FileManager = new FileManager('missions.json');
    const missions:any[] = fm.readFile();
    const foundMission = missions.find((item:Mission) => item.id === this.id);
    if (foundMission) {
      const updatedMissions = missions.map((item:Mission) => {
        if (item.id === this.id) {
          return { ...item, name: this.name, teachers:this.teachers, students: this.students };
        }
        return item;
      });
      fm.writeFile(updatedMissions);
      return;
    }
    missions.push(this);
    fm.writeFile(missions);
  }
}