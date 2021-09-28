import { resolveCombat } from "./resolveCombat";

describe ("resolve combat correctly",() => {
    it("attack hits successfully",()=>{
        const hitPoints = resolveCombat(10,7);
        expect(hitPoints).toBe(3)
    })
        it("missed attack",()=>{
        const hitPoints = resolveCombat(2,7);
        expect(hitPoints).toBe(0)
    })
})