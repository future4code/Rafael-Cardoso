import { UserDatabase } from "../data/UserDatabase";
import { User, stringToUserRole, UserRole } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { NotFoundError } from "../errors/NotFoundError";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator
  ) {}

  public async signup(
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    if (!name || !email || !password || !role) {
      throw new InvalidParameterError("Missing input");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password");
    }

    const id = this.idGenerator.generate();
    const cryptedPassword = await this.hashGenerator.hash(password);

    await this.userDatabase.createUser(
      new User(id, name, email, cryptedPassword, stringToUserRole(role))
    );

    const accessToken = this.tokenGenerator.generate({
      id,
      role,
    });
    return { accessToken };
  }

  public async login(email: string, password: string) {
    if (!email || !password) {
      throw new InvalidParameterError("Missing input");
    }

    const user = await this.userDatabase.getUserByEmail(email);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    const isPasswordCorrect = await this.hashGenerator.compareHash(
      password,
      user.getPassword()
    );

    if (!isPasswordCorrect) {
      throw new InvalidParameterError("Invalid password");
    }

    const accessToken = this.tokenGenerator.generate({
      id: user.getId(),
      role: user.getRole(),
    });

    return { accessToken };
  }

  public getUserById = async (token:string, id:string) => {
    if (!id) {
      throw new InvalidParameterError('Missing user id');
    }

    this.tokenGenerator.verify(token);

    const user = await this.userDatabase.getUserById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    };
  }

  public getAllUsers = async (token:string) => {
    const authData = this.tokenGenerator.verify(token);

    if (stringToUserRole(authData.role) !== UserRole.ADMIN) {
      throw new UnauthorizedError('You must be an admin to get all users');
    }

    const users = await this.userDatabase.getAllUsers();

    return users.map((item) => ({
      id: item.getId(),
      name: item.getName(),
      email: item.getEmail(),
      role: item.getRole()
    }));
  }

  public getProfile = async (token:string) => {
    const authData = this.tokenGenerator.verify(token);

    const user = await this.userDatabase.getUserById(authData.id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return {
      id: user.getId(),
      name: user.getName(),
      email: user.getEmail(),
      role: user.getRole()
    };
  }
}
