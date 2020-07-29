import moment from 'moment';
import express, { Request, Response } from "express";
import { AddressInfo } from "net";

import {
  createUser,
  getUserById, 
  editUserById,
  createTask,
  getTaskById,
  getAllUsers,
  getTaskByCreatorById,
  queryUser,
  assignResponsibleUserToTask,
  getResponsibleUsersByTask,
  editTaskStatus,
  getTaskByStatus,
  getTasksDelayed,
  deleteResponsibleUserFromTask
} from './functions';

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

app.put('/user', async (req:Request, res:Response) => {
  try {
    await createUser(req.body.name as string, req.body.nickname as string, req.body.email as string);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/user/all', async (req:Request, res:Response) => {
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

app.post('/user/edit/:id', async (req:Request, res:Response) => {
  try {
    await editUserById(req.params.id as string, req.body as any);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.put('/task', async (req:Request, res:Response) => {
  try {
    await createTask(req.body.title as string, req.body.description as string, req.body.limitDate as string, req.body.creatorUserId as string);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/task/delayed', async (req:Request, res:Response) => {
  try {
    const tasksFromDB = await getTasksDelayed();
    const tasks = tasksFromDB.map((task:any) => {
      const taskId = task.task_id;
      const limitDate = moment(task.limit_date, "YYYY-MM-DD").format("DD/MM/YYYY");
      const creatorUserId = task.creator_user_id;
      const creatorUserNickname = task.creator_user_nickname;
      const { title, description } = task;
      return { taskId, title, description, limitDate, creatorUserId, creatorUserNickname };
    });
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(400).send({ message: error. message });
  }
});

app.get('/task/:id', async (req:Request, res:Response) => {
  try {
    const task = await getTaskById(req.params.id as string);
    if (task) {
      const taskId = task.task_id;
      const limitDate = moment(task.limit_date, "YYYY-MM-DD").format("DD/MM/YYYY");
      const creatorUserId = task.creator_user_id;
      const creatorUserNickname = task.creator_user_nickname;
      const { title, description, status } = task;
      const responsibleUsers = await getResponsibleUsersByTask(req.params.id);
      res.status(200).send({ taskId, title, description, limitDate, status, creatorUserId, creatorUserNickname, responsibleUsers });
    } else {
      res.status(200).send({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/task/creatorUser', async (req:Request, res:Response) => {
  try {
    const user = await getUserById(req.query.id as string);
    if (user) {
      const tasksFromDB = await getTaskByCreatorById(req.query.id as string);
      const tasks = tasksFromDB.map((task:any) => {
        const taskId = task.task_id;
        const limitDate = moment(task.limit_date, "YYYY-MM-DD").format("DD/MM/YYYY");
        const creatorUserId = task.creator_user_id;
        const creatorUserNickname = task.creator_user_nickname;
        const { title, description, status } = task;
        return { taskId, title, description, limitDate, status, creatorUserId, creatorUserNickname };
      });
      res.status(200).send({ tasks });
    } else {
      res.status(200).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/user', async (req:Request, res:Response) => {
  try {
    const users = await queryUser(req.query.query as string);
    res.status(200).send({ users });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post('/task/responsible', async (req:Request, res:Response) => {
  try {
    const task = await getTaskById(req.body.taskId as string);
    let allUsersExist:boolean = true;
    for (let responsibleId of req.body.responsibleUsersIds) {
      const user = getUserById(responsibleId as string);
      if (!user) {
        allUsersExist = false;
      }
    }
    if (task && allUsersExist) {
      for (let responsibleId of req.body.responsibleUsersIds) {
        await assignResponsibleUserToTask(req.body.taskId as string, responsibleId as string);
      }
      res.status(200).send({ message: 'Success' });
    } else {
      res.send({ message: 'Tarefa ou usuários não encontrados' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/task/responsible/:id', async (req:Request, res:Response) => {
  try {
    const task = await getTaskById(req.params.id as string);
    if (task) {
      const users = await getResponsibleUsersByTask(req.params.id as string);
      res.status(200).send({ users });
    } else {
      res.status(200).send({ message: 'Tarefa não encontrada' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post('/task/status/edit/:id', async (req:Request, res:Response) => {
  try {
    await editTaskStatus(req.params.id as string, req.body as any);
    res.status(200).send({ message: 'Success' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/task', async (req:Request, res:Response) => {
  try {
    const tasksFromDB = await getTaskByStatus(req.query.status as string);
    const tasks = tasksFromDB.map((task:any) => {
      const taskId = task.task_id;
      const limitDate = moment(task.limit_date, "YYYY-MM-DD").format("DD/MM/YYYY");
      const creatorUserId = task.creator_user_id;
      const creatorUserNickname = task.creator_user_nickname;
      const { title, description } = task;
      return { taskId, title, description, limitDate, creatorUserId, creatorUserNickname };
    });
    res.status(200).send({ tasks });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete('/task/:taskId/responsible/:responsibleId', async (req:Request, res:Response) => {
  try {
    const task = await getTaskById(req.params.taskId as string);
    const user = await getUserById(req.params.responsibleId as string);
    if (task && user) {
      const users = await getResponsibleUsersByTask(req.params.taskId as string);
      const userIsResponsible = users.find((item:any) => req.params.responsibleId === item.id);
      console.log(userIsResponsible)
      if (userIsResponsible) {
        await deleteResponsibleUserFromTask(req.params.taskId as string, req.params.responsibleId as string);
        res.send({ message: 'Success' });
      } else {
        res.send({ message: 'Tarefa e usuário não se correspondem' });
      }
    } else {
      res.send({ message: 'Tarefa ou usuário não encontrado' });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});