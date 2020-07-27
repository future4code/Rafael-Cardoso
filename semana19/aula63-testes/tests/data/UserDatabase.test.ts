import { UserDatabase } from '../../src/data/UserDatabase';
import { timeStamp } from 'console';
import { hasUncaughtExceptionCaptureCallback } from 'process';

const userDatabase = new UserDatabase();

describe('UserDatabase', () => {
  afterEach(async () => {
    await userDatabase.deleteUserById('001002003');
  })

  afterAll(async () => {
    await UserDatabase.destroyConnection();
  })

  test('Create User',  async () => {
    const id = '001002003';
    const name = 'Astro';
    const nickname = 'devastro';
    const email = 'astrodev@bol.com.br';

    await userDatabase.createUser(id, name, nickname, email);

    const userFromDb = await userDatabase.getUserById(id);

    expect(userFromDb).not.toBe(undefined);
    expect(userFromDb).toEqual({
      id: '001002003',
      name: 'Astro',
      nickname: 'devastro',
      email: 'astrodev@bol.com.br'
    });
  });

  test('Create User with an error', async () => {
    try {
      const id = '001002003';
      const name = 'Astro';
      const nickname = 'astro';
      const email = 'astrodev@bol.com.br';

      await userDatabase.createUser(id, name, nickname, email);

      const userFromDb = await userDatabase.getUserById(id)
    } catch (error) {
      expect(error).not.toBe(undefined)
    }
  });
});