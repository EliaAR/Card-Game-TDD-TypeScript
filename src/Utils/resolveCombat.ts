import { rollD20, rollD4 } from "./dices";
import { getAbilityModifier } from "./getAbilityModifier";

function resolveCombat(
  strength: number,
  dexterity: number,
  roll20 = rollD20,
  roll4 = rollD4
): number {
  const strengthModifier = getAbilityModifier(strength);
  const dexterityModifier = getAbilityModifier(dexterity);
  const attackRoll = roll20() + strengthModifier;
  const armorClass = 10 + dexterityModifier;
  if (attackRoll >= armorClass) {
    return roll4() + strengthModifier;
  } else {
    return 0;
  }
}
export { resolveCombat };
