import { render, screen } from "@testing-library/react";
import { Player } from "./Player";

function Setup() {
  return render(
    <Player
      name="Nombre"
      srcImg="https://via.placeholder.com/150"
      life={7}
      maxLife={15}
      strength={8}
      dexterity={9}
    />
  );
}

describe("player is display corretly", () => {
  it("category is shown", () => {
    Setup();
    const playerCategory = screen.getByText(/jugador/i);
    expect(playerCategory).toBeInTheDocument();
  });
  it("name is shown", () => {
    Setup();
    const playerName = screen.getByText(/nombre/i);

    expect(playerName).toBeInTheDocument();
  });
  it("image is shown", () => {
    Setup();
    const playerImg = screen.getByAltText(/imagen nombre/i) as HTMLImageElement;

    expect(playerImg.src).toBe("https://via.placeholder.com/150");
  });
  it("stats are shown", () => {
    Setup();
    const life = screen.getByText(/vida: 7 \/ 15/i);
    const strength = screen.getByText(/fuerza: 8/i);
    const dexterity = screen.getByText(/destreza: 9/i);

    expect(life).toBeInTheDocument();
    expect(strength).toBeInTheDocument();
    expect(dexterity).toBeInTheDocument();
  });
});
