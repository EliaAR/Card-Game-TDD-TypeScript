import { getAbilityModifier } from "./getAbilityModifier";

describe("get ability modifier correctly", () => {
  it("get ability modifier for 1", () => {
    const modifierFor1 = getAbilityModifier(1);
    expect(modifierFor1).toBe(-5);
  });
  it("get ability modifier for 20", () => {
    const modifierFor20 = getAbilityModifier(20);
    expect(modifierFor20).toBe(5);
  });
  it("get ability modifier for 40", () => {
    const modifierFor40 = getAbilityModifier(40);
    expect(modifierFor40).toBe(15);
  });
});
