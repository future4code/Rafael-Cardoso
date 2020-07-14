import { Database } from "../Database";
import { ROLES } from "../../service/Authenticator";

export class UserDatabase extends Database {

  private static TABLE_NAME:string = 'User';

  public createUser = async (id:string, name:string, email:string, password:string, role:ROLES):Promise<void> => {
    try {
      await this.getConnection()
      .insert({ id, name, email, password, role })
      .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getUserByEmail = async (email:string):Promise<any> => {
    try {
      const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ email });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getUserById = async (id:string):Promise<any> => {
    try {
      const result = await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public deleteUserById = async (id:string):Promise<void> => {
    try {
      await this.getConnection()
      .select('*')
      .from(UserDatabase.TABLE_NAME)
      .delete()
      .where({ id });
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}