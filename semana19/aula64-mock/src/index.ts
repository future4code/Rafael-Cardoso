import { validateCharacter, Character } from "./validateCharacter";
import { performAttack, PerformAttackInput } from "./performAttack";

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

performAttack(input, validateCharacter);