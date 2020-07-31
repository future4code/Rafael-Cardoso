import { Request, Response } from 'express';
import { BandBusiness } from "../../business/BandBusiness";
import { IdGenerator } from "../../service/IdGenerator";
import { Authenticator } from '../../service/Authenticator';
import { BandDatabase } from "../../data/BandDatabase";
import { BaseDatabase } from '../../data/BaseDatabase';
import { Band, CreateBandInputDTO, CreateBandResponseDTO } from '../../model/Band';

export class BandController {
  private static bandBusiness = new BandBusiness(
    new IdGenerator(),
    new Authenticator(),
    new BandDatabase()
  );

  public createBand = async (req:Request, res:Response) => {
    try {
      const token = req.headers.authorization!;

      const input:CreateBandInputDTO = req.body;

      const message:CreateBandResponseDTO = await BandController.bandBusiness.createBand(token, input);

      res.status(200).send(message);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }

    await BaseDatabase.destroyConnection();
  }

  public getBandByQuery = async (req:Request, res:Response) => {
    try {
      const token = req.headers.authorization!;

      const query = req.query.query as string;

      const band:Band = await BandController.bandBusiness.getBandByQuery(token, query);

      res.status(200).send(band);
    } catch (error) {
      res.status(error.statusCode || 400).send({ message: error.message });
    }

    await BaseDatabase.destroyConnection();
  }
}