import { Character } from "./validateCharacter";

export const performAttack = (
  input:PerformAttackInput, 
  validator:(input:Character) => boolean
):void => {
  const { striker, defender } = input;
  if (!validator(striker) || !validator(defender)) {
    throw new Error('Invalid character');
  }

  if (striker.strength > defender.defense) {
    defender.health -= striker.strength - defender.defense;
  }
}

export interface PerformAttackInput {
  striker:Character;
  defender:Character;
}