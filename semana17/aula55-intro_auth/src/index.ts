import express, { Request, Response } from "express";
import { AddressInfo } from "net";

import { UserDatabase } from './data/UserDatabase';
import { IdGenerator } from './service/IdGenerator';
import { Authenticator } from './service/Authenticator';

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

app.post('/signup', async (req:Request, res:Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      throw new Error('Insert a name');
    }
    if (!email || email.indexOf('@') === -1) {
      throw new Error('Insert a valid email');
    }
    if (!password || password.length < 6) {
      throw new Error('Insert a valid password');
    }
    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    const userDb = new UserDatabase();
    await userDb.createUser(id, name, email, password);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.post('/login', async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;
    if (!email || email.indexOf('@') === -1) {
      throw new Error('Insert a valid email');
    }

    const userDb = new UserDatabase();
    const user = await userDb.getUserByEmail(email);
    const id = user.id;
    
    if (user.password !== password) {
      throw new Error('Invalid password');
    }

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });

    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

app.get('/user/profile', async (req:Request, res:Response) => {
  try {
    const token = req.headers.authorization as string;
    
    const authenticator = new Authenticator();
    const authData = authenticator.getData(token);

    const userDb = new UserDatabase();
    const user = await userDb.getUserById(authData.id);
    
    res.status(200).send({ id: user.id, email: user.email });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});