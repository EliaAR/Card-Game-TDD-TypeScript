import { rollD20, rollD12, rollD10, rollD8, rollD6, rollD4 } from "./dices";

function createMathRandomMock(value: number) {
  const mockMath = Object.create(global.Math);
  mockMath.random = () => value;
  global.Math = mockMath;
}

describe("dices works correctly", () => {
  describe("rollD20 works correctly", () => {
    it("rollD20 returns maximun of 20", () => {
      createMathRandomMock(0.9999);
      const result = rollD20();
      expect(result).toBe(20);
    });
    it("rollD20 returns minimun of 1", () => {
      createMathRandomMock(0);
      const result = rollD20();
      expect(result).toBe(1);
    });
    it("rollD20 returns value in the middle", () => {
      createMathRandomMock(0.5);
      const result = rollD20();
      expect(result).toBe(11);
    });
  });
  describe("rollD12 works correctly", () => {
    it("rollD12 returns maximun of 12", () => {
      createMathRandomMock(0.9999);
      const result = rollD12();
      expect(result).toBe(12);
    });
    it("rollD12 returns minimun of 1", () => {
      createMathRandomMock(0);
      const result = rollD12();
      expect(result).toBe(1);
    });
    it("rollD12 returns value in the middle", () => {
      createMathRandomMock(0.5);
      const result = rollD12();
      expect(result).toBe(7);
    });
  });
  describe("rollD10 works correctly", () => {
    it("rollD10 returns maximun of 10", () => {
      createMathRandomMock(0.9999);
      const result = rollD10();
      expect(result).toBe(10);
    });
    it("rollD10 returns minimun of 1", () => {
      createMathRandomMock(0);
      const result = rollD10();
      expect(result).toBe(1);
    });
    it("rollD10 returns value in the middle", () => {
      createMathRandomMock(0.5);
      const result = rollD10();
      expect(result).toBe(6);
    });
  });
  describe("rollD8 works correctly", () => {
    it("rollD8 returns maximun of 8", () => {
      createMathRandomMock(0.9999);
      const result = rollD8();
      expect(result).toBe(8);
    });
    it("rollD8 returns minimun of 1", () => {
      createMathRandomMock(0);
      const result = rollD8();
      expect(result).toBe(1);
    });
    it("rollD8 returns value in the middle", () => {
      createMathRandomMock(0.5);
      const result = rollD8();
      expect(result).toBe(5);
    });
  });
  describe("rollD6 works correctly", () => {
    it("rollD6 returns maximun of 6", () => {
      createMathRandomMock(0.9999);
      const result = rollD6();
      expect(result).toBe(6);
    });
    it("rollD6 returns minimun of 1", () => {
      createMathRandomMock(0);
      const result = rollD6();
      expect(result).toBe(1);
    });
    it("rollD6 returns value in the middle", () => {
      createMathRandomMock(0.5);
      const result = rollD6();
      expect(result).toBe(4);
    });
  });
  describe("rollD4 works correctly", () => {
    it("rollD4 returns maximun of 4", () => {
      createMathRandomMock(0.9999);
      const result = rollD4();
      expect(result).toBe(4);
    });
    it("rollD4 returns minimun of 1", () => {
      createMathRandomMock(0);
      const result = rollD4();
      expect(result).toBe(1);
    });
    it("rollD4 returns value in the middle", () => {
      createMathRandomMock(0.5);
      const result = rollD4();
      expect(result).toBe(3);
    });
  });
});
