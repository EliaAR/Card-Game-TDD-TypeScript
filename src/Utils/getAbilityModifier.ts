function getAbilityModifier(abilityScore: number) {
  return Math.floor((abilityScore - 10) / 2);
}
export { getAbilityModifier };
