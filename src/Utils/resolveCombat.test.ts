import { resolveCombat } from "./resolveCombat";

describe("resolve combat correctly", () => {
  it("attack hits successfully", () => {
    const hitPoints = resolveCombat(
      16,
      12,
      () => 10,
      () => 2
    );
    expect(hitPoints).toBe(5);
  });
  it("missed attack", () => {
    const hitPoints = resolveCombat(
      16,
      12,
      () => 7,
      () => 1
    );
    expect(hitPoints).toBe(0);
  });
});
