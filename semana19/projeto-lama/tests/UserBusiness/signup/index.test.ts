import { UserBusiness } from "../../../src/business/UserBusiness";
import { User, stringToUserRole, USER_ROLES } from "../../../src/model/User";
import { AuthenticationData } from "../../../src/service/Authenticator";
import { RefreshToken } from "../../../src/model/RefreshToken";

describe('Testing UserBusiness.signup', () => {
  let idGenerator = {};
  let authenticator = {};
  let hashManager = {};
  let userDatabase = {};
  let refreshTokenDatabase = {};

  test(`Should return 'Missing parameters' for empty name`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: '',
        email: 'astrodev@bol.com',
        password: '123456',
        role: 'NORMAL',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });
  
  test(`Should return 'Missing parameters' for empty email`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: '',
        password: '123456',
        role: 'NORMAL',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });
  
  test(`Should return 'Missing parameters' for empty password`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: '',
        role: 'NORMAL',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });
  
  test(`Should return 'Missing parameters' for empty role`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: '123456',
        role: '',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });
  
  test(`Should return 'Missing parameters' for empty device`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: '123456',
        role: 'NORMAL',
        device: ''
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Invalid email' for invalid email`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: 'astrodevbol.com',
        password: '123456',
        role: 'NORMAL',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid email');
    }
  });

  test(`Should return 'Invalid password' for invalid password`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: '12345',
        role: 'NORMAL',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid password');
    }
  });

  test(`Should return 'Invalid user role' for invalid user role`, async () => {
    expect.assertions(2);

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    const hash = jest.fn((password:string) => 'hash');
    hashManager = { hash };

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.signUp({ 
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: '123456',
        role: 'super',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid user role');
    }
  });

  test('Should return both token in case of succes', async () => {
    expect.assertions(6);

    const generateId = jest.fn(() => 'id');
    idGenerator = { generateId };

    const hash = jest.fn((password:string) => 'hash');
    hashManager = { hash };

    const createUser = jest.fn((user:User) => {});
    userDatabase = { createUser };

    const generateToken = jest.fn((authData:AuthenticationData, time:string) => 'token');
    authenticator = { generateToken };

    const createRefreshToken = jest.fn((refreshToken:RefreshToken) => {});
    refreshTokenDatabase = { createRefreshToken };

    const userBusiness = new UserBusiness(
      idGenerator as any,
      authenticator as any,
      hashManager as any,
      userDatabase as any,
      refreshTokenDatabase as any
    );

    const result = await userBusiness.signUp({
      name: 'Astrodev',
      email: 'astrodev@bol.com',
      password: '123456',
      role: 'admin',
      device: 'MyMac'
    });

    expect(result.accessToken).toBe('token');
    expect(result.refreshToken).toBe('token');
    expect(generateId).toHaveBeenCalledTimes(1);
    expect(generateToken).toHaveBeenCalledTimes(2);
    expect(generateToken).toHaveBeenCalledWith({ id: 'id', role: USER_ROLES.ADMIN }, '10min');
    expect(generateToken).toHaveBeenCalledWith({ id: 'id', device: 'MyMac' }, '1y');
  });
});