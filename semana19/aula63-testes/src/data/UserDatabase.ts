import { BaseDatabase } from "./BaseDatabase";
import dotenv from "dotenv";

dotenv.config();

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = 'user';

  public createUser = async (id:string, name:string, nickname:string, email:string):Promise<void> => {
    await this.getConnection()
    .insert({ id, name, nickname, email })
    .into(UserDatabase.TABLE_NAME);
  }

  public getUserById = async (id:string):Promise<any> => {
    const result = await this.getConnection()
    .select('*')
    .from(UserDatabase.TABLE_NAME)
    .where({ id });

    return result[0];
  }

  public deleteUserById = async(id:string):Promise<any> => {
    await this.getConnection()
    .delete()
    .from(UserDatabase.TABLE_NAME)
    .where({ id });
  }

  public cleanTable = async ():Promise<any> => {
    await this.getConnection()(UserDatabase.TABLE_NAME)
    .truncate()
  }
}