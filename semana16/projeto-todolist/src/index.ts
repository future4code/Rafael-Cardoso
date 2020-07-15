import moment from 'moment';
import knex from "knex";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { AddressInfo } from "net";

import {
  createUser,
  getUserById, 
  editUserById,
  createTask,
  getTaskById,
  getAllUsers,
  getTaskByCreatorById
} from './functions';

dotenv.config();

export const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

// Exercício 1

app.put('/user', async (req:Request, res:Response) => {
  try {
    await createUser(req.body.name as string, req.body.nickname as string, req.body.email as string);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Exercício 2

app.get('/user/:id', async (req:Request, res:Response):Promise<any> => {
  try {
    const user = await getUserById(req.params.id as string);
    if (user) {
      const { id, nickname } = user
      res.status(200).send({ id, nickname });
    } else {
      res.status(200).send({ message: "Usuário não encontrado" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Exercício 3

app.post('/user/edit/:id', async (req:Request, res:Response) => {
  try {
    let hasEmptyString:boolean = false;
    for (let key in req.body) {
      if (req.body[key] === null || req.body[key] === "") {
        hasEmptyString = true;
      } 
    }
    if (hasEmptyString) {
      res.status(200).send({ message: 'Não pode ser enviado item vazio.' });
    } else {
      await editUserById(req.params.id as string, req.body as any);
      res.status(200).send({ message: 'Success' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Exercício 4

app.put('/task', async (req:Request, res:Response) => {
  try {
    await createTask(req.body.title as string, req.body.description as string, req.body.limitDate as string, req.body.creatorUserId as string);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Exercício 5

app.get('/task/:id', async (req:Request, res:Response) => {
  try {
    const task = await getTaskById(req.params.id as string);
    if (task) {
      const taskId = task.task_id;
      const limitDate = moment(task.limit_date, "YYYY-MM-DD").format("DD/MM/YYYY");
      const creatorUserId = task.creator_user_id;
      const creatorUserNickname = task.creator_user_nickname;
      const { title, description, status } = task;
      res.status(200).send({ taskId, title, description, limitDate, status, creatorUserId, creatorUserNickname });
    } else {
      res.status(200).send({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Exercício 6

app.get('/user', async (req:Request, res:Response) => {
  try {
    const usersFromDB = await getAllUsers();
    const users = usersFromDB.map((user:any) => {
      return { id: user.id, nickname: user.nickname };
    });
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Exercício 7

app.get('/task', async (req:Request, res:Response) => {
  try {
    const tasksFromDB = await getTaskByCreatorById(req.query.creatorUserId as string);
    const tasks = tasksFromDB.map((task:any) => {
      const taskId = task.task_id;
      const limitDate = moment(task.limit_date, "YYYY-MM-DD").format("DD/MM/YYYY");
      const creatorUserId = task.creator_user_id;
      const creatorUserNickname = task.creator_user_nickname;
      const { title, description, status } = task;
      return { taskId, title, description, limitDate, status, creatorUserId, creatorUserNickname };
    });
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});