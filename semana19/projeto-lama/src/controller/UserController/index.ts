import { Request, Response } from 'express';
import { UserBusiness } from '../../business/UserBusiness';
import { IdGenerator } from '../../service/IdGenerator';
import { Authenticator } from '../../service/Authenticator';
import { HashManager } from '../../service/HashManager';
import { UserDatabase } from '../../data/UserDatabase';
import { RefreshTokenDatabase } from '../../data/RefreshTokenDatabase';
import { BaseDatabase } from '../../data/BaseDatabase';
import { SignUpInputDTO, LoginInputDTO } from '../../model/User';
import { TokenResponseDTO, RefreshTokenInputDTO } from '../../model/RefreshToken';

export class UserController {
  private static userBusiness = new UserBusiness(
    new IdGenerator(),
    new Authenticator(),
    new HashManager(),
    new UserDatabase(),
    new RefreshTokenDatabase()
  );
  
  public signup = async (req:Request, res:Response) => {
    try {
      const input:SignUpInputDTO = req.body;

      const token:TokenResponseDTO = await UserController.userBusiness.signUp(input);

      res.status(200).send(token);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public login = async (req:Request, res:Response) => {
    try {
      const input:LoginInputDTO = req.body;

      const token:TokenResponseDTO = await UserController.userBusiness.login(input);

      res.status(200).send(token);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public getAccessTokenByRefreshToken = async (req:Request, res:Response) => {
    try {
      const input:RefreshTokenInputDTO = req.body;

      const token:TokenResponseDTO = await UserController.userBusiness.getAccessTokenByRefreshToken(input);

      res.status(200).send(token);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }
  }
}