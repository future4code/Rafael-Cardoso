import { InvalidParameterError } from "../../error/InvalidParameterError";

export class User {
  constructor (
    private id:string,
    private name:string,
    private email:string,
    private password:string,
    private role:USER_ROLES
  ) {}

  public getId = ():string => this.id;

  public getName = ():string => this.name;

  public getEmail = ():string => this.email;

  public getPassword = ():string => this.password;

  public getRole = ():USER_ROLES => this.role;

  public setId = (id:string):void => {
    this.id = id;
  }

  public setName = (name:string):void => {
    this.name = name;
  }

  public setEmail = (email:string):void => {
    this.email = email;
  }

  public setPassword = (password:string):void => {
    this.password = password;
  }

  public setRole = (role:USER_ROLES):void => {
    this.role = role;
  }

  public static toUserModel = (user:any):User => (
    new User(user.id, user.name, user.email, user.password, user.role)
  )
}

export const stringToUserRole = (role:string):USER_ROLES => {
  switch (role.toLowerCase()) {
    case 'normal':
      return USER_ROLES.NORMAL;
    case 'admin':
      return USER_ROLES.ADMIN;
    default:
      throw new InvalidParameterError('Invalid user role');
  }
}

export interface SignUpInputDTO {
  name:string,
  email:string,
  password:string,
  role:string,
  device:string
}

export interface LoginInputDTO {
  email:string,
  password:string,
  device:string
}

export enum USER_ROLES {
  NORMAL = 'NORMAL',
  ADMIN = 'ADMIN'
}