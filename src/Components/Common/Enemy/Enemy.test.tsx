import { render, screen } from "@testing-library/react";
import { Enemy } from "./Enemy";

function Setup() {
  return render(
    <Enemy
      enemyName="Nombre del enemigo"
      enemySrcImg="https://via.placeholder.com/150"
      life={7}
      strength={8}
      dexterity={9}
    />
  );
}

describe("enemy is display corretly", () => {
  it("name is shown", () => {
    Setup();
    const nameEnemy = screen.getByText(/nombre del enemigo/i);

    expect(nameEnemy).toBeInTheDocument();
  });
  it("image is shown", () => {
    Setup();
    const enemyImg = screen.getByAltText(
      /imagen de enemigo/i
    ) as HTMLImageElement;

    expect(enemyImg.src).toBe("https://via.placeholder.com/150");
  });
  it("stats are shown", () => {
    Setup();
    const life = screen.getByText(/vida: 7/i);
    const strength = screen.getByText(/fuerza: 8/i);
    const dexterity = screen.getByText(/destreza: 9/i);

    expect(life).toBeInTheDocument();
    expect(strength).toBeInTheDocument();
    expect(dexterity).toBeInTheDocument();
  });
});
