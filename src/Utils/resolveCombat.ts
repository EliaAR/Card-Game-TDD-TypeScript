import { rollD20, rollD4 } from "./dices";
import { getAbilityModifier } from "./getAbilityModifier";

interface ResolveCombatReturn {
  damage: number;
  resultD20: number;
  resultD4: number;
  strengthModifier: number;
  dexterityModifier: number;
}

function resolveCombat(
  strength: number,
  dexterity: number,
  roll20 = rollD20,
  roll4 = rollD4
): ResolveCombatReturn {
  const strengthModifier = getAbilityModifier(strength);
  const dexterityModifier = getAbilityModifier(dexterity);
  const resultD20 = roll20();
  const resultD4 = roll4();
  const attackRoll = resultD20 + strengthModifier;
  const armorClass = 10 + dexterityModifier;
  if (attackRoll >= armorClass) {
    return {
      damage: resultD4 + strengthModifier,
      resultD20,
      resultD4,
      strengthModifier,
      dexterityModifier,
    };
  } else {
    return {
      damage: 0,
      resultD20,
      resultD4,
      strengthModifier,
      dexterityModifier,
    };
  }
}
export { resolveCombat };
