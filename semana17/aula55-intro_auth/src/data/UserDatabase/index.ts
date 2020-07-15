import knex from "knex";
import dotenv from "dotenv";

dotenv.config();

export class UserDatabase {
  private connection = knex({
    client: "mysql",
    connection: {
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || "3306"),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    }
  });

  private static TABLE_NAME:string = 'User';

  public createUser = async (id:string, name:string, email:string, password:string):Promise<void> => {
    try {
      await this.connection
      .insert({ id, name, email, password })
      .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getUserByEmail = async (email:string):Promise<any> => {
    try {
      const result = await this.connection(UserDatabase.TABLE_NAME)
      .where({ email });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public getUserById = async (id:string):Promise<any> => {
    try {
      const result = await this.connection(UserDatabase.TABLE_NAME)
      .where({ id });
      return result[0];
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}