import moment from 'moment';
import { connection } from '../';

// Exercício 1

export const createUser = async (name:string, nickname:string, email:string):Promise<void> => {
  try {
    if (name && nickname && email) {
      const id:string = `${Date.now()}${Math.random()}`;
      await connection('user')
      .insert({ id, name, nickname, email });
      console.log('Usuário criado com sucesso.');
    } else {
      console.log('Insira todos os dados necessários.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Exercício 2

export const getUserById = async (id:string):Promise<any> => {
  try {
    if (id) {
      const result = await connection('user')
      .where({ id });
      return result[0];
    } else {
      console.log('Insira um valor para o id.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Exercício 3

export const editUserById = async (id:string, body:any):Promise<any> => {
  try {
    if (id) {
      await connection('user')
      .update(body)
      .where({ id });
    } else {
      console.log('Insira um valor para o id.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Exercício 4

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
      console.log('Insira todos os dados necessários.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Exercício 5

export const getTaskById = async (id:string):Promise<any> => {
  try {
    if (id) {
      const result = await connection.raw(`
        SELECT t.id as task_id, t.title, t.description, t.limit_date, t.status, u.id as creator_user_id, u.nickname as creator_user_nickname FROM task t
        JOIN user u ON t.creator_user_id = u.id
        WHERE t.id = ${id}
      `);
      return result[0][0];
    } else {
      console.log('Insira um valor para o id.');
    }
  } catch (error) {
    console.error(error);
  }
}

// Exercício 6

export const getAllUsers = async ():Promise<any> => {
  try {
    const result = await connection('user');
    return result;
  } catch (error) {
    console.error(error);
  }
}

// Exercício 7

export const getTaskByCreatorById = async (creatorId:string):Promise<any> => {
  try {
    if (creatorId) {
      const result = await connection.raw(`
      SELECT t.id as task_id, t.title, t.description, t.status, t.limit_date, u.id as creator_user_id, u.nickname as creator_user_nickname FROM task t
      JOIN user u ON t.creator_user_id = u.id
      WHERE u.id = ${creatorId}
      `);
      return result[0];
    } else {
      console.log('Insira um valor para o id.');
    }
  } catch (error) {
    console.error(error);
  }
}