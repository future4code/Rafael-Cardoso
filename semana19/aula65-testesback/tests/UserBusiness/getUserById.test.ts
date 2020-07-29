import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserRole, stringToUserRole } from "../../src/model/User";

describe('Testing UserBusiness.getUserById', () => {
  let userDatabase = {};
  let hashGenerator = {};
  let tokenGenerator = {};
  let idGenerator = {};

  test("Should return 'Missing user id' for no id", async () => {
    expect.assertions(2);

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getUserById('token', '');
    } catch (err) {
      expect(err.errorCode).toBe(422);
      expect(err.message).toBe("Missing user id");
    }
  });

  test("Should return 'User not found' when there is no user with the provided id", async () => {
    expect.assertions(3);

    const getUserById = jest.fn((id:string) => {});
    userDatabase = { getUserById };

    const verify = jest.fn((token:string) => ({ id: "id", role: UserRole.NORMAL }));
    tokenGenerator = { verify };

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getUserById("token", "user-id");
    } catch (err) {
      expect(getUserById).toHaveBeenCalledWith("user-id");
      expect(err.errorCode).toBe(404);
      expect(err.message).toBe("User not found");
    }
  });

  test('Should return the user in case of success', async () => {
    expect.assertions(3);

    const getUserById = jest.fn((id:string) => (
      new User(
        'user-id', 
        'Astrodev', 
        'astrodev@gmail.com', 
        'hash', 
        stringToUserRole('ADMIN')
      )
    ));
    userDatabase = { getUserById };

    const verify = jest.fn((token:string) => ({ id: "id", role: UserRole.NORMAL }));
    tokenGenerator = { verify };

    const userBusiness = new UserBusiness(
      userDatabase as any,
      hashGenerator as any,
      tokenGenerator as any,
      idGenerator as any
    );

    const result = await userBusiness.getUserById('token', 'user-id');

    expect(getUserById).toHaveBeenCalledWith("user-id");
    expect(verify).toHaveBeenCalledWith('token');
    expect(result).toEqual({
      id: 'user-id',
      name: 'Astrodev',
      email: 'astrodev@gmail.com',
      role: UserRole.ADMIN
    });
  });
});