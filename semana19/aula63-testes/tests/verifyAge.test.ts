import { verifyAge, Casino, User, NACIONALITY, LOCATION, Result } from '../src/verifyAge';

describe('Testing verifyAge', () => {
  test('a brazilian allowed to enter in Brazil', () => {
    const brazilianUser:User = {
      name: "Astrodev",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN
    };

    const casino:Casino = {
      name: 'Tupiniquim Tower',
      location: LOCATION.BRAZIL
    };

    const users:User[] = [];

    users.push(brazilianUser);

    const result:Result = verifyAge(casino, users);
    expect(result.brazilians.allowed).toEqual(['Astrodev']);
  });

  test('an american allowed to enter in Brazil',() => {
    const americanUser:User = {
      name: 'Jim Halpert',
      age: 25,
      nacionality: NACIONALITY.AMERICAN
    };

    const casino:Casino = {
      name: 'Tupiniquim Tower',
      location: LOCATION.BRAZIL
    };

    const users:User[] = [];

    users.push(americanUser);

    const result:Result = verifyAge(casino, users);
    expect(result.americans.allowed).toEqual(['Jim Halpert']);
  });

  test('nobody is allowed', () => {
    const users:User[] = [];
    users.push({
      name: "Pam Beesly",
      age: 19,
      nacionality: NACIONALITY.AMERICAN
    });
    users.push({
      name: 'Tufão',
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN
    });

    const casino:Casino = {
      name: 'Trump Tower',
      location: LOCATION.EUA
    };
    
    const result:Result = verifyAge(casino, users);
    expect(result.brazilians.unallowed).toEqual(['Tufão']);
    expect(result.americans.unallowed).toEqual(['Pam Beesly']);
  });

  test('americans are allowed and brazilians are not', () => {
    const users:User[] = [];
    users.push({
      name: "Pam Beesly",
      age: 21,
      nacionality: NACIONALITY.AMERICAN
    });
    users.push({
      name: 'Tufão',
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN
    });

    const casino:Casino = {
      name: 'Trump Tower',
      location: LOCATION.EUA
    };
    
    const result:Result = verifyAge(casino, users);
    expect(result.brazilians.unallowed).toEqual(['Tufão']);
    expect(result.americans.allowed).toEqual(['Pam Beesly']);
  });

  test('a brazilian allowed to enter in Brazil', () => {
    const brazilianUser:User = {
      name: "Astrodev",
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN
    };

    const casino:Casino = {
      name: 'Tupiniquim Tower',
      location: LOCATION.BRAZIL
    };

    const users:User[] = [];

    users.push(brazilianUser);

    const result:Result = verifyAge(casino, users);
    expect(result.brazilians.allowed.length).toBeGreaterThan(0);
    expect(result.brazilians.allowed.length).toBeLessThan(2);
  });

  test('an american allowed to enter in Brazil',() => {
    const americanUser:User = {
      name: 'Jim Halpert',
      age: 25,
      nacionality: NACIONALITY.AMERICAN
    };

    const casino:Casino = {
      name: 'Tupiniquim Tower',
      location: LOCATION.BRAZIL
    };

    const users:User[] = [];

    users.push(americanUser);

    const result:Result = verifyAge(casino, users);
    expect(result.americans.unallowed.length).toEqual(0);
  });

  test('nobody is allowed', () => {
    const users:User[] = [];
    users.push({
      name: "Pam Beesly",
      age: 19,
      nacionality: NACIONALITY.AMERICAN
    });
    users.push({
      name: 'Tufão',
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN
    });

    const casino:Casino = {
      name: 'Trump Tower',
      location: LOCATION.EUA
    };
    
    const result:Result = verifyAge(casino, users);
    expect(result.brazilians.unallowed).toContain('Tufão');
    expect(result.americans.unallowed).toContain('Pam Beesly');
  });

  test('americans are allowed and brazilians are not', () => {
    const users:User[] = [];
    users.push({
      name: "Pam Beesly",
      age: 21,
      nacionality: NACIONALITY.AMERICAN
    });
    users.push({
      name: 'Tufão',
      age: 19,
      nacionality: NACIONALITY.BRAZILIAN
    });

    const casino:Casino = {
      name: 'Trump Tower',
      location: LOCATION.EUA
    };
    
    const result:Result = verifyAge(casino, users);
    expect(result.brazilians.unallowed.length).toBeGreaterThan(0);
    expect(result.americans.unallowed.length).toBeLessThan(1);
    expect(result.americans.allowed.length).toEqual(1);
  });
});