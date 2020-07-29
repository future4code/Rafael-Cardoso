import { Character } from "../src/validateCharacter";
import { performAttack, PerformAttackInput } from "../src/performAttack";

describe('Testing performAttack', () => {
  test('must perform attack', () => {
    const validatorMock = jest.fn(() => true);

    const striker:Character = {
      name: 'Zangief',
      health: 2000,
      strength: 500,
      defense: 400
    };
    
    const defender:Character = {
      name: "Chun Li",
      health: 2500,
      strength: 600,
      defense: 300,
    };
    
    const input:PerformAttackInput = { striker, defender };

    performAttack(input, validatorMock);

    expect(defender.health).toEqual(2300);
    expect(validatorMock).toHaveBeenCalled();
    expect(validatorMock).toHaveBeenCalledTimes(2);
    expect(validatorMock).toHaveReturnedTimes(2);
  });

  test('must return error', () => {
    expect.assertions(4);
    const validatorMock = jest.fn(() => false);

    const striker:Character = {
      name: 'Zangief',
      health: 2000,
      strength: 500,
      defense: 400
    };
    
    const defender:Character = {
      name: "Chun Li",
      health: 2500,
      strength: 600,
      defense: 300,
    };
    
    const input:PerformAttackInput = { striker, defender };

    try {
      performAttack(input, validatorMock);
    } catch (error) {
      expect(error.message).toEqual('Invalid character');
      expect(validatorMock).toHaveBeenCalled();
      expect(validatorMock).toHaveBeenCalledTimes(1);
      expect(validatorMock).toHaveReturnedTimes(1);
    }
  });

  test('must not inflict damage, strength is less than defense', () => {
    expect.assertions(1);
    const validatorMock = jest.fn(() => true);

    const striker:Character = {
      name: 'Zangief',
      health: 2000,
      strength: 500,
      defense: 400
    };
    
    const defender:Character = {
      name: "Chun Li",
      health: 2500,
      strength: 600,
      defense: 600,
    };
    
    const input:PerformAttackInput = { striker, defender };

    performAttack(input, validatorMock);

    expect(defender.health).toEqual(2500);
  });

  test('must perform attack', () => {
    expect.assertions(1);
    const validatorMock = jest.fn(() => true);

    const striker:Character = {
      name: 'Zangief',
      health: 2000,
      strength: 900,
      defense: 400
    };
    
    const defender:Character = {
      name: "Chun Li",
      health: 2500,
      strength: 600,
      defense: 400,
    };
    
    const input:PerformAttackInput = { striker, defender };

    performAttack(input, validatorMock);

    expect(defender.health).toEqual(2000);
  });
});