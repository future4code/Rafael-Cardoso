import moment from 'moment';
import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

const connection = knex({
  client: "mysql",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

export const createUser = async (name:string, nickname:string, email:string):Promise<void> => {
  try {
    if (name && nickname && email) {
      const id:string = `${Date.now()}${Math.random()}`;
      await connection('user')
      .insert({ id, name, nickname, email });
      console.log('Usuário criado com sucesso.');
    } else {
      console.error('Insira todos os dados necessários');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getUserById = async (id:string):Promise<any> => {
  try {
    if (id) {
      const result = await connection('user')
      .where({ id });
      return result[0];
    } else {
      console.error('Insira um valor para o id');
    }
  } catch (error) {
    console.error(error);
  }
}

export const editUserById = async (id:string, body:any):Promise<void> => {
  try {
    if (id) {
      let hasEmptyString:boolean = false;
      for (let key in body) {
        if (body[key] === null || body[key] === "") {
          hasEmptyString = true;
        } 
      }
      if (hasEmptyString) {
        console.error('Não pode ser enviado item vazio');
      } else {
        await connection('user')
        .update(body)
        .where({ id });
      }
    } else {
      console.error('Insira um valor para o id');
    }
  } catch (error) {
    console.error(error);
  }
}

export const createTask = async (title:string, description:string, limitDate:string, creatorUserId:string):Promise<void> => {
  try {
    if (title && description && limitDate && creatorUserId) {
      const id:string = `${Date.now()}${Math.random()}`;
      const limit_date = moment(limitDate, "DD/MM/YYYY").format("YYYY-MM-DD");
      const creator_user_id = creatorUserId
      await connection('task')
      .insert({ id, title, description, limit_date, creator_user_id });
      console.log('Tarefa criada com sucesso.');
    } else {
      console.error('Insira todos os dados necessários');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getTaskById = async (id:string):Promise<any> => {
  try {
    if (id) {
      const result = await connection.raw(`
      SELECT t.id as task_id, t.title, t.description, t.limit_date, t.status, u.id as creator_user_id, u.nickname as creator_user_nickname FROM task t
      JOIN user u ON t.creator_user_id = u.id
      WHERE t.id = '${id}'
      `);
      return result[0][0];
    } else {
      console.error('Insira um valor para o id');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getAllUsers = async ():Promise<any> => {
  try {
    const result = await connection('user');
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const getTaskByCreatorById = async (creatorId:string):Promise<any> => {
  try {
    if (creatorId) {
      const result = await connection.raw(`
      SELECT t.id as task_id, t.title, t.description, t.status, t.limit_date, u.id as creator_user_id, u.nickname as creator_user_nickname FROM task t
      JOIN user u ON t.creator_user_id = u.id
      WHERE u.id = '${creatorId}'
      `);
      return result[0];
    } else {
      console.error('Insira um valor para o id');
    }
  } catch (error) {
    console.error(error);
  }
}

export const queryUser = async (query:string):Promise<any> => {
  try {
    if (query) {
      const result = await connection.raw(`
      SELECT id, nickname FROM user WHERE nickname LIKE '%${query}%' OR email LIKE '%${query}%'
      `);
      return result[0];
    } else {
      console.error('Não pode ser passada uma query vazia');
    }
  } catch (error) {
    console.error(error);
  }
}

export const assignResponsibleUserToTask = async (taskId:string, responsibleUserId:string):Promise<void> => {
  try {
    if (taskId && responsibleUserId) {
      const task_id = taskId;
      const responsible_user_id = responsibleUserId;
      await connection('responsibleUserTaskManager')
      .insert({ task_id, responsible_user_id });
      console.log('Usuário atribuído com sucesso a tarefa');
    } else {
      console.error('Não pode ser enviado um item vazio');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getResponsibleUsersByTask = async (taskId:string):Promise<any> => {
  try {
    if (taskId) {
      const result = await connection.raw(`
      SELECT u.id, u.nickname FROM responsibleUserTaskManager rutm
      LEFT JOIN user u ON u.id = rutm.responsible_user_id
      WHERE rutm.task_id = '${taskId}'
      `);
      return result[0];
    } else {
      console.error('Insira um valor para o id');
    }
  } catch (error) {
    console.error(error);
  }
}

export const editTaskStatus = async (id:string, body:any):Promise<void> => {
  try {
    if (id) {
      let hasEmptyString:boolean = false;
      for (let key in body) {
        if (body[key] === null || body[key] === "") {
          hasEmptyString = true;
        } 
      }
      if (hasEmptyString) {
        console.error('Não pode ser enviado item vazio');
      } else {
        await connection('task')
        .update(body)
        .where({ id });
      }
    } else {
      console.error('Insira um valor para o id');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getTaskByStatus = async (status:string):Promise<any> => {
  try {
    if (status) {
      const result = await connection.raw(`
      SELECT t.id as task_id, t.title, t.description, t.limit_date, u.id as creator_user_id, u.nickname as creator_user_nickname FROM task t
      JOIN user u ON t.creator_user_id = u.id
      WHERE t.status = '${status}'
      `);
      return result[0];
    } else {
      console.error('Insira um valor para o status');
    }
  } catch (error) {
    console.error(error);
  }
}

export const getTasksDelayed = async ():Promise<any> => {
  try {
    const today = moment().format('YYYY-MM-DD');
    const result = await connection.raw(`
      SELECT t.id as task_id, t.title, t.description, t.limit_date, u.id as creator_user_id, u.nickname as creator_user_nickname FROM task t
      JOIN user u ON t.creator_user_id = u.id
      WHERE (t.status = 'to_do' OR t.status = 'doing') AND t.limit_date < '${today}'
    `);
    return result[0];
  } catch (error) {
    console.error(error);
  }
}

export const deleteResponsibleUserFromTask = async (taskId:string, responsibleUserId:string):Promise<void> => {
  try {
    if (taskId && responsibleUserId) {
      await connection.raw(`
        DELETE FROM responsibleUserTaskManager WHERE task_id = '${taskId}' AND responsible_user_id = '${responsibleUserId}'
      `);
      console.log('Usuário responsável excluído com sucesso');
    } else {
      console.error('Insira todos os dados necessários');
    }
  } catch (error) {
    console.error(error);
  }
}