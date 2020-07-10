import moment from 'moment';
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
    await updateSalaryById(req.body.id as string, Number(req.body.salary));
    res.status(200).send({ message: 'Sucesso!' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.delete('/actor/:id', async (req:Request, res:Response) => {
  try {
    await deleteById(req.params.id as string);
    res.status(200).send({ message: 'Sucesso!' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const createMovie = async (
  id:string, 
  title:string, 
  synopsis:string, 
  releaseDate:string, 
  rating:number, 
  playingLimitDate:string
):Promise<void> => {
  try {
    const release_date:string = moment(releaseDate, "DD/MM/YYYY").format("YYYY-MM-DD");
    const playing_limit_date:string = moment(playingLimitDate, "DD/MM/YYYY").format("YYYY=MM-DD");
    await connection
    .insert({ id, title, synopsis, release_date, rating, playing_limit_date })
    .into('movie');
    console.log('Filme adicionado com sucesso.');
  } catch (error) {
    console.error(error);
  }
}

// createMovie(
//   '005', 
//   'O Auto da Compadecida', 
//   'O filme mostra as aventuras de João Grilo e Chicó, dois nordestinos pobres que vivem de golpes para sobreviver. Eles estão sempre enganando o povo de um pequeno vilarejo no sertão da Paraíba, inclusive o temido cangaceiro Severino de Aracaju, que os persegue pela região. Somente a aparição da Nossa Senhora poderá salvar esta dupla.',
//   '10/09/2000',
//   9,
//   '07/01/2001'
// )

app.post('/movie', async (req:Request, res:Response) => {
  try {
    await createMovie(
      req.body.id as string, 
      req.body.title as string, 
      req.body.synopsis as string, 
      req.body.releaseDate as string,
      Number(req.body.rating),
      req.body.playingLimitDate as string
    )
    res.status(200).send({ message: 'Sucesso!' });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const getAllMovies = async ():Promise<any> => {
  try {
    const result = await connection('movie')
    .limit(15);
    return result;
  } catch (error) {
    console.error(error);
  }
}

app.get('/movie', async (req:Request, res:Response) => {
  try {
    const data = await getAllMovies();
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

const searchMovie = async (search:string):Promise<any> => {
  try {
    const result = await connection.raw(`
      SELECT * FROM movie WHERE title LIKE '%${search}%' OR synopsis LIKE '%${search}%' ORDER BY release_date DESC
    `)
    console.log(result[0]);
    return result[0];
  } catch (error) {
    console.error(error);
  }
}

app.get('/movie/search', async (req:Request, res:Response) => {
  try {
    const data = await searchMovie(req.query.query as string);
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});