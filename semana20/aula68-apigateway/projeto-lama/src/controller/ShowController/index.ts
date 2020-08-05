import { Request, Response } from 'express';
import { ShowBusiness } from '../../business/ShowBusiness';
import { IdGenerator } from '../../service/IdGenerator';
import { Authenticator } from '../../service/Authenticator';
import { ShowDatabase } from '../../data/Showdatabase';
import { BaseDatabase } from '../../data/BaseDatabase';
import { Show, CreateShowInputDTO, CreateShowResponseDTO } from '../../model/Show';

export class ShowController {
  private static showBusiness = new ShowBusiness(
    new IdGenerator(),
    new Authenticator(),
    new ShowDatabase()
  );

  public createShow = async (req:Request, res:Response) => {
    try {
      const token = req.headers.authorization!

      const input:CreateShowInputDTO = req.body;

      const message:CreateShowResponseDTO = await ShowController.showBusiness.createShow(token, input);

      res.status(200).send(message);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public getShowsByDay = async (req:Request, res:Response) => {
    try {
      const token = req.headers.authorization!;

      const day = req.query.day as string;

      const shows = await ShowController.showBusiness.getShowsByDay(token, day);

      res.status(200).send({ shows });
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}