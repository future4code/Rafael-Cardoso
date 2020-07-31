import { IdGenerator } from "../../service/IdGenerator";
import { Authenticator } from "../../service/Authenticator";
import { HashManager } from "../../service/HashManager";
import { UserDatabase } from "../../data/UserDatabase";
import { RefreshTokenDatabase } from "../../data/RefreshTokenDatabase";
import { User, stringToUserRole, LoginInputDTO, SignUpInputDTO } from '../../model/User';
import { RefreshToken, TokenResponseDTO } from "../../model/RefreshToken";

import { InvalidParameterError } from "../../error/InvalidParameterError";
import { NotFoundError } from "../../error/NotFoundError";

export class UserBusiness {
  constructor (
    private idGenerator:IdGenerator,
    private authenticator:Authenticator,
    private hashManager:HashManager,
    private userDatabase:UserDatabase,
    private refreshTokenDatabase:RefreshTokenDatabase
  ) {}

  public signUp = async (input:SignUpInputDTO):Promise<TokenResponseDTO> => {
    const { name, email, password, role, device } = input;

    if (!name || !email || !password || !role || !device) {
      throw new InvalidParameterError('Missing parameters');
    }
    if (email.indexOf('@') === -1) {
      throw new InvalidParameterError('Invalid email');
    }
    if (password.length < 6) {
      throw new InvalidParameterError('Invalid password');
    }

    const id:string = this.idGenerator.generateId();
    const hashPassword:string = await this.hashManager.hash(password);
    await this.userDatabase.createUser(User.toUserModel({ 
      id, 
      name, 
      email, 
      password: hashPassword, 
      role: stringToUserRole(role) 
    }));

    const accessToken = this.authenticator.generateToken({ id, role: stringToUserRole(role) }, '10min');
    const refreshToken = this.authenticator.generateToken({ id, device }, '1y');

    await this.refreshTokenDatabase.createRefreshToken(RefreshToken.toRefreshTokenModel({ 
      token: refreshToken, 
      device, 
      isActive: true, 
      userId: id 
    }));

    return { accessToken, refreshToken };
  }

  public login = async (input:LoginInputDTO):Promise<TokenResponseDTO> => {
    const { email, password, device } = input;

    if (!email || !password || !device) {
      throw new InvalidParameterError('Missing parameters');
    }
    if (email.indexOf('@') === -1) {
      throw new InvalidParameterError('Invalid email');
    }
    if (password.length < 6) {
      throw new InvalidParameterError('Invalid password');
    }

    const user = await this.userDatabase.getUserByEmail(email);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isPasswordCorrect = await this.hashManager.compare(password, user.getPassword());
    if (!isPasswordCorrect) {
      throw new InvalidParameterError('Incorrect password');
    }
    const id = user.getId();
    const role = user.getRole();
    
    const accessToken = this.authenticator.generateToken({ id, role }, '10min');
    const refreshToken = this.authenticator.generateToken({ id, device }, '1y');

    const refreshTokenFromDb = await this.refreshTokenDatabase.getRefreshTokenByIdAndDevice(id, device);
    if (refreshTokenFromDb) {
      await this.refreshTokenDatabase.deleteRefreshTokenByToken(refreshTokenFromDb.getToken());
    }

    await this.refreshTokenDatabase.createRefreshToken(RefreshToken.toRefreshTokenModel({ 
      token: refreshToken, 
      device, 
      isActive: true, 
      userId: id 
    }));

    return { accessToken, refreshToken };
  }
}