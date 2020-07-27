import { performPurchase, User } from '../src/performPurchase';

describe('Testing performPurchase', () => {
  test('for a balance greater than value', () => {
    const user:User = {
      name: 'Astrodev',
      balance: 200
    };

    const result = performPurchase(user, 100);

    expect(result).toEqual({ ...user, balance: 100 });
  });

  test('for a balance equal to value', () => {
    const user:User = {
      name: 'Astrodev',
      balance: 200
    };

    const result = performPurchase(user, 200);

    expect(result).toEqual({ ...user, balance: 0 });
  });

  test('for a balance less than value', () => {
    const user:User = {
      name: 'Astrodev',
      balance: 200
    };

    const result = performPurchase(user, 300);

    expect(result).toEqual(undefined);
  });
});