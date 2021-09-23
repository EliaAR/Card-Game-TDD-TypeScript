import { render, screen } from "@testing-library/react";
import { Character } from "./Character";

describe("character exist", () => {
  it("stats exist", () => {
    render(<Character life={7} strength={8} dexterity={9} />);
    const life = screen.getByText(/vida: 7/i);
    const strength = screen.getByText(/fuerza: 8/i);
    const dexterity = screen.getByText(/destreza: 9/i);

    expect(life).toBeInTheDocument();
    expect(strength).toBeInTheDocument();
    expect(dexterity).toBeInTheDocument();
  });
  //   it("atack works", () => {
  //     render(<Character />);
  //   });
  //   it("defens works", () => {
  //     render(<Character />);
  //   });
});
