import { UserBusiness } from "../../src/business/UserBusiness";
import { User, UserRole, stringToUserRole } from "../../src/model/User";

describe('Testing UserBusiness.getAllUsers', () => {
  let userDatabase = {};
  let hashGenerator = {};
  let tokenGenerator = {};
  let idGenerator = {};
  
  test("Should return 'You must be an admin to get all users' when user is not ADMIN", async () => {
    expect.assertions(2);

    const verify = jest.fn((token:string) => ({ id: "id", role: UserRole.NORMAL }));
    tokenGenerator = { verify };

    try {
      const userBusiness = new UserBusiness(
        userDatabase as any,
        hashGenerator as any,
        tokenGenerator as any,
        idGenerator as any
      );

      await userBusiness.getAllUsers('token');
    } catch (err) {
      expect(err.errorCode).toBe(401);
      expect(err.message).toBe("You must be an admin to get all users");
    }
  });

  test('Should return the user in case of success', async () => {
    expect.assertions(3);

    const getAllUsers = jest.fn(() => ([
      new User(
        'user-id', 
        'Astrodev', 
        'astrodev@gmail.com', 
        'hash', 
        stringToUserRole('ADMIN')
      )
    ]));
    userDatabase = { getAllUsers };

    const verify = jest.fn((token:string) => ({ id: "id", role: UserRole.ADMIN }));
    tokenGenerator = { verify };

    const userBusiness = new UserBusiness(
      userDatabase as any,
      hashGenerator as any,
      tokenGenerator as any,
      idGenerator as any
    );

    const result = await userBusiness.getAllUsers('token');

    expect(getAllUsers).toHaveBeenCalledTimes(1);
    expect(verify).toHaveBeenCalledWith('token');
    expect(result).toContainEqual({
      id: 'user-id',
      name: 'Astrodev',
      email: 'astrodev@gmail.com',
      role: UserRole.ADMIN
    });
  });
});