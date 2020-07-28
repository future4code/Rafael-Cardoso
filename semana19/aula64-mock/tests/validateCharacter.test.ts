import { validateCharacter, Character } from "../src/validateCharacter";

describe('Testing Validate Character', () => {
  test('must return false for a character with empty name', () => {
    const character:Character = {
      name: '',
      health: 2000,
      strength: 500,
      defense: 400
    };

    const result = validateCharacter(character);

    expect(result).toEqual(false);
  });

  test('mest return true for a character with health, strength or defense equal to 0', () => {
    const character:Character = {
      name: 'Astrodev',
      health: 0,
      strength: 500,
      defense: 400
    };

    const result = validateCharacter(character);

    expect(result).toEqual(true);
  });

  test('must return true for a character with all valid inputs', () => {
    const character:Character = {
      name: 'Astrodev',
      health: 2000,
      strength: 500,
      defense: 400
    };

    const result = validateCharacter(character);

    expect(result).toEqual(true);
  });
});