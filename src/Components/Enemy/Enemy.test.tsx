import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Enemy } from "./Enemy";

function Setup() {
  const onClickEnemyMock = jest.fn();
  render(
    <Enemy
      onClickEnemy={onClickEnemyMock}
      name="Nombre"
      srcImg="https://via.placeholder.com/150"
      life={7}
      maxLife={15}
      strength={8}
      dexterity={9}
      level={4}
    />
  );
  return onClickEnemyMock;
}

describe("enemy is working corretly", () => {
  it("category is shown", () => {
    Setup();
    const enemyCategory = screen.getByText(/enemigo/i);
    expect(enemyCategory).toBeInTheDocument();
  });
  it("name is shown", () => {
    Setup();
    const enemyName = screen.getByText(/nombre/i);
    expect(enemyName).toBeInTheDocument();
  });
  it("image is shown", () => {
    Setup();
    const enemyImg = screen.getByAltText(/imagen nombre/i) as HTMLImageElement;

    expect(enemyImg.src).toBe("https://via.placeholder.com/150");
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
  it("when click on enemy onClickEnemy is called", () => {
    const onClickMock = Setup();
    const button = screen.getByRole("button", { name: /nombre/i });
    userEvent.click(button);
    expect(onClickMock).toHaveBeenCalled();
  });
});
