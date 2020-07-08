import knex from "knex";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import { AddressInfo } from "net";

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

const app = express();

app.use(express.json());

const server = app.listen(process.env.PORT || 3000, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
});

const getActorByName = async (name:string):Promise<any> => {
  try {
    const result = await connection.raw(`
      SELECT * FROM actor WHERE name LIKE '${name}'
    `);
    console.log(result[0][0]);
    return result[0][0];
  } catch (error) {
    console.error(error);
  }
}

const countActorsByGender = async (gender:string):Promise<any> => {
  try {
    const result = await connection.raw(`
      SELECT COUNT(*) as count FROM actor WHERE gender = '${gender}'
    `);
    console.log(result[0][0].count);
    return result[0][0];
  } catch (error) {
    console.error(error);
  }
}

const updateSalaryById = async (id:string, salary:number):Promise<void> => {
  try {
    await connection('actor')
    .update({ salary: salary })
    .where('id', id);
    console.log('Salário atualizado com sucesso.');
  } catch (error) {
    console.error(error);
  }
}

const deleteById = async (id:string):Promise<void> => {
  try {
    await connection('actor')
    .delete()
    .where('id', id);
    console.log('Ator deletado com sucesso.');
  } catch (error) {
    console.error(error);
  }
}

const getAvgSalaryByGender = async (gender:string):Promise<any> => {
  try {
    const result = await connection('actor')
    .avg('salary as average')
    .where({ gender });
    console.log(result[0].average);
    return result[0].average;
  } catch (error) {
    console.error(error);
  }
}

// getActorByName('Paola');
// countActorsByGender('female');
// updateSalaryById('003', 400000);
// deleteById('007');
// getAvgSalaryByGender('male');

app.get('/actor', async (req:Request, res:Response) => {
  try {
    const count = await countActorsByGender(req.query.gender as string);
    res.status(200).send({ count });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post('/actor', async (req:Request, res:Response) => {
  try {
    await updateSalaryById(req.body.id, req.body.salary);
    res.status(200).send({ message: 'Sucesso!' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete('/actor/:id', async (req:Request, res:Response) => {
  try {
    await deleteById(req.params.id);
    res.status(200).send({ message: 'Sucesso!' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});