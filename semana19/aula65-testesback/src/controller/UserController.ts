import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator()
  );

  async signup(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signup(
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
      );
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public async login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    try {
      const result = await UserController.UserBusiness.login(email, password);
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public getUserById = async (req:Request, res:Response) => {
    const id = req.params.id!;
    const token = req.headers.authorization!;
    try {
      const result = await UserController.UserBusiness.getUserById(token, id);
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public getAllUsers = async (req:Request, res:Response) => {
    const token = req.headers.authorization!;
    try {
      const result = await UserController.UserBusiness.getAllUsers(token);
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public getProfile = async (req:Request, res:Response) => {
    const token = req.headers.authorization!;
    try {
      const result = await UserController.UserBusiness.getProfile(token);
      res.status(200).send(result);
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }

    await BaseDatabase.destroyConnection();
  }
}
