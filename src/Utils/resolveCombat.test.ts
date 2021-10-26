import { resolveCombat } from "./resolveCombat";

describe("resolve combat correctly", () => {
  it("attack hits successfully", () => {
    const { damage } = resolveCombat(
      16,
      12,
      () => 10,
      () => 2
    );
    expect(damage).toBe(5);
  });
  it("missed attack", () => {
    const { damage } = resolveCombat(
      16,
      12,
      () => 7,
      () => 1
    );
    expect(damage).toBe(0);
  });
});
