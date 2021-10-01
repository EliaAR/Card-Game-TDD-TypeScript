import { render, screen, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Battlefield } from "./Battlefield";
import { Character } from "../Common/Types";

const enemy: Character = {
  life: 30,
  strength: 16,
  dexterity: 14,
  name: "erPatriarca",
  srcImg: "https://via.placeholder.com/150",
};

const player: Character = {
  life: 50,
  strength: 16,
  dexterity: 14,
  name: "laObrera",
  srcImg: "https://via.placeholder.com/150",
};

function Setup(mock20: () => number, mock4: () => number) {
  return render(
    <Battlefield enemy={enemy} player={player} roll20={mock20} roll4={mock4} />
  );
}

describe("when click on enemy action attack is performed correctly", () => {
  it("when attack hits life changes and is registered in CombatLog", () => {
    Setup(
      () => 12,
      () => 2
    );
    const button = screen.getByRole("button", { name: enemy.name });
    userEvent.click(button);
    const life = getByText(button, /vida: 25/i);
    const log = screen.getByRole("log");
    const message = getByText(log, /ataque exitoso, 5 puntos de daño/i);
    expect(life).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
  it("attack failed and is registered in CombatLog", () => {
    Setup(
      () => 8,
      () => 2
    );
    const button = screen.getByRole("button", { name: enemy.name });
    userEvent.click(button);
    const life = getByText(button, /vida: 30/i);
    const log = screen.getByRole("log");
    const message = getByText(log, /ataque fallido/i);
    expect(life).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
