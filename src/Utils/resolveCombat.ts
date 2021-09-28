function resolveCombat(strength: number, dexterity: number): number {
  if (strength > dexterity) {
    return strength - dexterity;
  } else {
    return 0;
  }
}
export { resolveCombat };
