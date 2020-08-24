import { UserBusiness } from "../../../src/business/UserBusiness";
import { User, USER_ROLES } from "../../../src/model/User";
import { AuthenticationData } from "../../../src/service/Authenticator";

describe('Testing UserBusiness.getAccessTokenByRefreshToken', () => {
  let idGenerator = {};
  let authenticator = {};
  let hashManager = {};
  let userDatabase = {};
  let refreshTokenDatabase = {};

  test(`Should return 'Missing parameters' for empty refreshToken`, async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.getAccessTokenByRefreshToken({
        refreshToken: '',
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

      await userBusiness.getAccessTokenByRefreshToken({
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliMWMwYmE0LTNmOGItNDJiMC1hY2E5LWI3ZjYyNjQ2MjJlNSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTU5NjM4MjE2MCwiZXhwIjoxNTk2MzgyNzYwfQ.qrcs01US8FGF6IRrhfsGV9lThW3SAJ6C8h88-WUmboY',
        device: ''
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Missing parameters');
    }
  });

  test(`Should return 'Refresh token has no device' for a device with no refreshToken`, async () => {
    expect.assertions(2);

    const getData = jest.fn((token:string) => ({ id:'id', device: 'notMyMac' }));
    authenticator = { getData };

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.getAccessTokenByRefreshToken({
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliMWMwYmE0LTNmOGItNDJiMC1hY2E5LWI3ZjYyNjQ2MjJlNSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTU5NjM4MjE2MCwiZXhwIjoxNTk2MzgyNzYwfQ.qrcs01US8FGF6IRrhfsGV9lThW3SAJ6C8h88-WUmboY',
        device: 'MyMac'
      });
    } catch (error) {
      expect(error.statusCode).toBe(422);
      expect(error.message).toBe('Refresh token has no device');
    }
  });

  test(`Should return 'User not found' when there is no user with id from thee refreshToken provided`, async () => {
    expect.assertions(3);

    const getData = jest.fn((token:string) => ({ id:'id', device: 'MyMac' }));
    authenticator = { getData };

    const getUserById = jest.fn((id:string) => {});
    userDatabase = { getUserById };

    try {
      const userBusiness = new UserBusiness(
        idGenerator as any,
        authenticator as any,
        hashManager as any,
        userDatabase as any,
        refreshTokenDatabase as any
      );

      await userBusiness.getAccessTokenByRefreshToken({
        refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliMWMwYmE0LTNmOGItNDJiMC1hY2E5LWI3ZjYyNjQ2MjJlNSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTU5NjM4MjE2MCwiZXhwIjoxNTk2MzgyNzYwfQ.qrcs01US8FGF6IRrhfsGV9lThW3SAJ6C8h88-WUmboY',
        device: 'MyMac'
      });
    } catch (error) {
      expect(getUserById).toHaveBeenCalledWith('id');
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('User not found');
    }
  });

  test(`Should return accessToken in case of success`, async () => {
    expect.assertions(3);

    const getData = jest.fn((token:string) => ({ id:'id', device: 'MyMac' }));
    const generateToken = jest.fn((authData:AuthenticationData, time:string) => 'token');
    authenticator = { getData, generateToken };

    const getUserById = jest.fn((id:string) => (
      User.toUserModel({
        id: 'id',
        name: 'Astrodev',
        email: 'astrodev@bol.com',
        password: 'hash',
        role: USER_ROLES.ADMIN
      })
    ));
    userDatabase = { getUserById };

    const userBusiness = new UserBusiness(
      idGenerator as any,
      authenticator as any,
      hashManager as any,
      userDatabase as any,
      refreshTokenDatabase as any
    );

    const result = await userBusiness.getAccessTokenByRefreshToken({
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjliMWMwYmE0LTNmOGItNDJiMC1hY2E5LWI3ZjYyNjQ2MjJlNSIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTU5NjM4MjE2MCwiZXhwIjoxNTk2MzgyNzYwfQ.qrcs01US8FGF6IRrhfsGV9lThW3SAJ6C8h88-WUmboY',
      device: 'MyMac'
    });

    expect(result.accessToken).toEqual('token');
    expect(getUserById).toHaveBeenCalledWith('id');
    expect(generateToken).toHaveBeenCalledWith({ id: 'id', role: USER_ROLES.ADMIN }, '10min');
  });
});