import * as moment from 'moment';
import { User } from '../User';
import { Student } from '../Student';
import { Teacher, TEACHER_SPECIALTY } from '../Teacher';
import { Mission } from '../Mission';
import { FullTimeMission } from '../FullTimeMission';
import { NightMission } from '../NightMission';

export class MainTaskManager {
  private students:Student[] = [];
  private teachers:Teacher[] = [];
  private missions:Mission[] = [];

  public execute = ():void => {
    const turma1:Mission = new FullTimeMission('M001', moment('16/03/2020', 'DD/MM/YYYY'), moment('04/09/2020', 'DD/MM/YYY'), 4);
    turma1.setName('Primerona');
    const turma2:Mission = new NightMission('M002', moment('16/03/2020', 'DD/MM/YYYY'), moment('02/10/2020', 'DD/MM/YYY'), 3);
    turma2.setName('Primerona-na-night');
    const aluno1:Student = new Student('S0001', 'Juquinha', 'juquinha@bol.com', moment('25/07/1995', 'DD/MM/YYYY'), ['Jogar bola', 'Ler']);
    const aluno2:Student = new Student('S0002', 'Chiquinha', 'chiquinha@bol.com', moment('13/10/1992', 'DD/MM/YYYY'), ['Jogar video game', 'Marcenaria']);
    this.students.push(aluno1);
    this.students.push(aluno2);
    turma1.addStudent(aluno2);
    turma2.addStudent(aluno1);
    const prof1:Teacher = new Teacher('T001', 'José', 'jose@bol.com', moment('01/01/1990', 'DD/MM/YYYY'), [TEACHER_SPECIALTY.REACT, TEACHER_SPECIALTY.REDUX]);
    const prof2:Teacher = new Teacher(('T002'), 'Maria', 'maria@bol.com', moment('12/02/1989', 'DD/MM/YYYY'), [TEACHER_SPECIALTY.TYPESCRIPT, TEACHER_SPECIALTY.OOP]);
    this.teachers.push(prof1);
    this.teachers.push(prof2);
    turma1.addTeacher(prof1);
    turma1.addTeacher(prof2);
    const prof3:Teacher = new Teacher('T003', 'Tony', 'tony@bol.com', moment('30/09/1991', 'DD/MM/YYYY'), [TEACHER_SPECIALTY.BACKEND]);
    const prof4:Teacher = new Teacher('T004', 'Joana', 'joana@bol.com', moment('04/02/1997', 'DD/MM/YYYY'), [TEACHER_SPECIALTY.TESTES, TEACHER_SPECIALTY.CSS]);
    this.teachers.push(prof3);
    this.teachers.push(prof4);
    turma2.addTeacher(prof3);
    turma2.addTeacher(prof4);
    this.missions.push(turma1);
    this.missions.push(turma2);
  }

  public printAllStudents = ():void => {
    console.log('Todos os estudantes:');
    this.students.forEach((item:Student) => {
      console.log('');
      console.log(`Nome: ${item.name}`);
      console.log(`Email: ${item.email}`);
      console.log('Curso: Web Developer Full Stack');
      this.missions.forEach((mission:Mission) => {
        mission.getStudents().forEach((element:User) => {
          if (element.name === item.name) {
            console.log(`Módulo: ${mission.getCurrentModule()}`);
            console.log(`Turma: ${mission.getName()}`);
          }
        });
      });
      console.log(`Idade: ${item.getAge()} anos`);
    });
  }

  public printAllTeachers = ():void => {
    console.log('Todos os professores:');
    this.teachers.forEach((item:Teacher) => {
      let specialties:string = '';
      console.log('');
      console.log(`Nome: ${item.name}`);
      console.log(`Email: ${item.email}`);
      console.log(`Idade: ${item.getAge()} anos`);
      const n = item.specialties.length;
      item.specialties.forEach((item:TEACHER_SPECIALTY, idx:number) => {
        if (idx < n - 2) {
          specialties += `${item}, `;
        } else if (idx === n - 2) {
          specialties += `${item} e `;
        } else {
          specialties += `${item}`;
        }
      });
      console.log(`Especialidades: ${specialties}`);
    })
  }
}