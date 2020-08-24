import { UserBusiness } from "../../../src/business/UserBusiness";
import { User, stringToUserRole, USER_ROLES } from "../../../src/model/User";
import { AuthenticationData } from "../../../src/service/Authenticator";
import { RefreshToken } from "../../../src/model/RefreshToken";

describe('Testing UserBusiness.login', () => {
  let idGenerator = {};
  let authenticator = {};
  let hashManager = {};
  let userDatabase = {};
  let refreshTokenDatabase = {};

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

      await userBusiness.login({ 
        email: '',
        password: '123456',
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

      await userBusiness.login({ 
        email: 'astrodev@bol.com',
        password: '',
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

      await userBusiness.login({ 
        email: 'astrodev@bol.com',
        password: '123456',
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

      await userBusiness.login({ 
        email: 'astrodevbol.com',
        password: '123456',
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

      await userBusiness.login({ 
        email: 'astrodev@bol.com',
        password: '12345',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Invalid password');
    }
  });

  test(`Should return 'User not found' when there is no user with the provided email`, async () => {
    expect.assertions(3);

    const getUserByEmail = jest.fn((email:string) => {});
    userDatabase = { getUserByEmail };

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.login({ 
        email: 'astro@bol.com',
        password: '123456',
        device: 'MyMac'
      });
    } catch (error) {
      expect(getUserByEmail).toHaveBeenCalledWith('astro@bol.com')
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('User not found');
    }
  });

  test(`Should return 'Incorrect password' for incorrect password`, async () => {
    expect.assertions(4);

    const getUserByEmail = jest.fn((email:string) => (
      User.toUserModel({
        id: 'id',
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: 'hash',
        role: USER_ROLES.ADMIN
      })
    ));
    userDatabase = { getUserByEmail };

    const compare = jest.fn((password:string, hashPassword:string) => false);
    hashManager = { compare };

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.login({ 
        email: 'astrodev@bol.com',
        password: '123456',
        device: 'MyMac'
      });
    } catch (error) {
      expect(getUserByEmail).toHaveBeenCalledWith('astrodev@bol.com');
      expect(compare).toHaveBeenCalledWith('123456', 'hash');
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Incorrect password');
    }
  });

  test('Should return both token in case of succes', async () => {
    expect.assertions(9);

    const getUserByEmail = jest.fn((email:string) => (
      User.toUserModel({
        id: 'id',
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: 'hash',
        role: USER_ROLES.ADMIN
      })
    ));
    userDatabase = { getUserByEmail };

    const compare = jest.fn((password:string, hashPassword:string) => true);
    hashManager = { compare };

    const generateToken = jest.fn((authData:AuthenticationData, time:string) => 'token');
    authenticator = { generateToken };

    const getRefreshTokenByIdAndDevice = jest.fn((id:string, device:string) => (
      RefreshToken.toRefreshTokenModel({
        token: 'token',
        device: 'MyMac',
        isActive: true,
        userId: 'id'
      })
    ));
    const deleteRefreshTokenByToken = jest.fn((token:string) => {});
    const createRefreshToken = jest.fn((refreshToken:RefreshToken) => {});
    refreshTokenDatabase = { getRefreshTokenByIdAndDevice, deleteRefreshTokenByToken, createRefreshToken };

    const userBusiness = new UserBusiness(
      idGenerator as any,
      authenticator as any,
      hashManager as any,
      userDatabase as any,
      refreshTokenDatabase as any
    );

    const result = await userBusiness.login({ 
      email: 'astrodev@bol.com',
      password: '123456',
      device: 'MyMac'
    });

    expect(result).toEqual({ accessToken: 'token', refreshToken: 'token' });
    expect(getUserByEmail).toHaveBeenCalledWith('astrodev@bol.com');
    expect(compare).toHaveBeenCalledWith('123456', 'hash');
    expect(generateToken).toHaveBeenCalledTimes(2);
    expect(generateToken).toHaveBeenCalledWith({ id: 'id', role: USER_ROLES.ADMIN }, '10min');
    expect(generateToken).toHaveBeenCalledWith({ id: 'id', device: 'MyMac' }, '1y');
    expect(getRefreshTokenByIdAndDevice).toHaveBeenCalledWith('id', 'MyMac');
    expect(deleteRefreshTokenByToken).toHaveBeenCalledTimes(1);
    expect(createRefreshToken).toHaveBeenCalledTimes(1);
  });
});