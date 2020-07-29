export const validateCharacter = (input:Character):boolean => {
  const { name, health, strength, defense } = input;
  if (!name || health === undefined || strength === undefined || defense === undefined) {
    return false;
  }
  if (health < 0 || strength < 0 || defense < 0) {
    return false;
  }
  return true;
}

export interface Character {
  name:string;
  health:number;
  strength:number;
  defense:number;
}