import { BaseDatabase } from "../BaseDatabase";
import { Band } from "../../model/Band";

import { InternalServerError } from "../../error/InternalServerError";

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME:string = 'LamaBand';

  public static getTableName = ():string => BandDatabase.TABLE_NAME;

  public createBand = async (input:Band):Promise<void> => {
    const id = input.getId();
    const name = input.getName();
    const music_genre = input.getMusicGenre();
    const responsible = input.getResponsible();
    try {
      await this.getConnection()
        .insert({ id, name, music_genre, responsible })
        .into(BandDatabase.TABLE_NAME);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getBandByQuery = async (query:string):Promise<Band> => {
    try {
      const result = await this.getConnection()
        .select('id', 'name', 'music_genre as musicGenre', 'responsible')
        .from(BandDatabase.TABLE_NAME)
        .where({ id: query })
        .orWhere({ name: query });
      return Band.toBandModel(result[0]);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}