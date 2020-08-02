import { BaseDatabase } from "../BaseDatabase";
import { User } from "../../model/User";

import { InternalServerError } from "../../error/InternalServerError";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME:string = 'LamaUser';

  public static getTableName = ():string => UserDatabase.TABLE_NAME;

  public createUser = async (input:User):Promise<void> => {
    const id = input.getId();
    const name = input.getName();
    const email = input.getEmail();
    const password = input.getPassword();
    const role = input.getRole();
    try {
      await this.getConnection()
        .insert({ id, name, email, password, role })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getUserByEmail = async (email:string):Promise<User> => {
    try {
      const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_NAME)
        .where({ email });
      return User.toUserModel(result[0]);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }

  public getUserById = async (id:string):Promise<User> => {
    try {
      const result = await this.getConnection()
        .select('*')
        .from(UserDatabase.TABLE_NAME)
        .where({ id });
      return User.toUserModel(result[0]);
    } catch (error) {
      throw new InternalServerError(error.sqlMessage || error.message);
    }
  }
}