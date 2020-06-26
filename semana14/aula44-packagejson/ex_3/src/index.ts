import * as fs from 'fs';

const fileName: string = process.argv[2];
const newTask: string = process.argv[3];

try {
  const data: Buffer = fs.readFileSync(fileName);
  const tasks: string[] = JSON.parse(data.toString());
  tasks.push(newTask);
  const tasksString: string = JSON.stringify(tasks);
  fs.writeFileSync(fileName, tasksString);
  console.log('Tarefa adicionada com sucesso!');
} catch(error) {
  console.error(error);
}