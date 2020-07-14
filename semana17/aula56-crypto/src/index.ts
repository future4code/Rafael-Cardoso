import express, { Request, Response } from "express";
import { AddressInfo } from "net";

import { UserDatabase } from './data/UserDatabase';
import { IdGenerator } from './service/IdGenerator';
import { Authenticator } from './service/Authenticator';
import { HashManager } from "./service/HashManager";
import { Database } from "./data/Database";

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

const idGenerator = new IdGenerator();
const userDb = new UserDatabase();
const authenticator = new Authenticator();
const hashManager = new HashManager();

app.post('/signup', async (req:Request, res:Response) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name) {
      throw new Error('Insert a name');
    }
    if (!email || email.indexOf('@') === -1) {
      throw new Error('Insert a valid email');
    }
    if (!password || password.length < 6) {
      throw new Error('Insert a valid password');
    }
    const id = idGenerator.generateId();
    const hashPassword = await hashManager.hash(id);
    await userDb.createUser(id, name, email, hashPassword, role);
    const token = authenticator.generateToken({ id, role });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }

  await Database.destroyConnection();
});

app.post('/login', async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    if (!email || email.indexOf('@') === -1) {
      throw new Error('Insert a valid email');
    }
    const user = await userDb.getUserByEmail(email);
    const isPasswordCorrect = hashManager.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid password');
    }
    const { id, role } = user;
    const token = authenticator.generateToken({ id, role });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }

  await Database.destroyConnection();
});

app.get('/user/profile', async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization as string;
    const authData = authenticator.getData(token);
    if (authData.role !== 'NORMAL') {
      throw new Error('Only normal user can access this funcionality');
    }
    const user = await userDb.getUserById(authData.id);
    const { id, name, email, role } = user;
    
    res.status(200).send({ id, name, email, role });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }

  await Database.destroyConnection();
});

app.delete('/user/:id', async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization as string;
    const authData = authenticator.getData(token);
    if (authData.role !== 'ADMIN') {
      throw new Error('Only admin user can access this funcionality');
    }
    await userDb.deleteUserById(req.params.id);

    res.status(200).send({ message: 'User deleted successfully'});
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/user/:id', async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization as string;
    authenticator.getData(token);
    const user = await userDb.getUserById(req.params.id);
    const { id, name, email, role } = user;

    res.status(200).send({ id, name, email, role });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }

  await Database.destroyConnection();
});