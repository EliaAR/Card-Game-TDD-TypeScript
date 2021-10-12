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

function Setup(
  mockRoll20Enemy: () => number,
  mockRoll4Enemy: () => number,
  mockRoll20Player: () => number,
  mockRoll4Player: () => number
) {
  const mockOnCombatFinish = jest.fn();
  render(
    <Battlefield
      enemy={enemy}
      player={player}
      level={1}
      onCombatFinish={mockOnCombatFinish}
      mockRoll20Enemy={mockRoll20Enemy}
      mockRoll4Enemy={mockRoll4Enemy}
      mockRoll20Player={mockRoll20Player}
      mockRoll4Player={mockRoll4Player}
    />
  );
  return mockOnCombatFinish;
}

describe("Combat works correctly", () => {
  it("Player and enemy hits, life changes and is registered in CombatLog", () => {
    Setup(
      () => 12,
      () => 2,
      () => 16,
      () => 2
    );
    const log = screen.getByRole("log");
    const turnPlayerMessage = getByText(log, /turno del jugador/i);
    expect(turnPlayerMessage).toBeInTheDocument();

    const enemyButton = screen.getByRole("button", { name: enemy.name });
    userEvent.click(enemyButton);
    const enemyLife = getByText(enemyButton, /vida: 25/i);
    const attackPlayerMessage = getByText(
      log,
      /ataque exitoso del jugador, 5 puntos de daño/i
    );
    expect(enemyLife).toBeInTheDocument();
    expect(attackPlayerMessage).toBeInTheDocument();

    const turnEnemyMessage = getByText(log, /turno del enemigo/i);
    expect(turnEnemyMessage).toBeInTheDocument();

    const playerElement = screen.getByTestId("playerSection");
    const playerLife = getByText(playerElement, /vida: 45/i);
    const attackEnemyMessage = getByText(
      log,
      /ataque exitoso del enemigo, 5 puntos de daño/i
    );
    expect(playerLife).toBeInTheDocument();
    expect(attackEnemyMessage).toBeInTheDocument();
  });
  it("Player hits, enemy fails, life changes and is registered in CombatLog", () => {
    Setup(
      () => 12,
      () => 2,
      () => 8,
      () => 2
    );
    const log = screen.getByRole("log");
    const turnPlayerMessage = getByText(log, /turno del jugador/i);
    expect(turnPlayerMessage).toBeInTheDocument();

    const enemyButton = screen.getByRole("button", { name: enemy.name });
    userEvent.click(enemyButton);
    const enemyLife = getByText(enemyButton, /vida: 25/i);
    const attackPlayerMessage = getByText(
      log,
      /ataque exitoso del jugador, 5 puntos de daño/i
    );
    expect(enemyLife).toBeInTheDocument();
    expect(attackPlayerMessage).toBeInTheDocument();

    const turnEnemyMessage = getByText(log, /turno del enemigo/i);
    expect(turnEnemyMessage).toBeInTheDocument();

    const playerElement = screen.getByTestId("playerSection");
    const playerLife = getByText(playerElement, /vida: 50/i);
    const attackEnemyMessage = getByText(log, /ataque fallido del enemigo/i);
    expect(playerLife).toBeInTheDocument();
    expect(attackEnemyMessage).toBeInTheDocument();
  });
  it("Player fails, enemy hits, life changes and is registered in CombatLog", () => {
    Setup(
      () => 8,
      () => 2,
      () => 16,
      () => 2
    );
    const log = screen.getByRole("log");
    const turnPlayerMessage = getByText(log, /turno del jugador/i);
    expect(turnPlayerMessage).toBeInTheDocument();

    const enemyButton = screen.getByRole("button", { name: enemy.name });
    userEvent.click(enemyButton);
    const enemyLife = getByText(enemyButton, /vida: 30/i);
    const attackPlayerMessage = getByText(log, /ataque fallido del jugador/i);
    expect(enemyLife).toBeInTheDocument();
    expect(attackPlayerMessage).toBeInTheDocument();

    const turnEnemyMessage = getByText(log, /turno del enemigo/i);
    expect(turnEnemyMessage).toBeInTheDocument();

    const playerElement = screen.getByTestId("playerSection");
    const playerLife = getByText(playerElement, /vida: 45/i);
    const attackEnemyMessage = getByText(
      log,
      /ataque exitoso del enemigo, 5 puntos de daño/i
    );
    expect(playerLife).toBeInTheDocument();
    expect(attackEnemyMessage).toBeInTheDocument();
  });
  it("Player and enemy fail and is registered in CombatLog", () => {
    Setup(
      () => 8,
      () => 2,
      () => 8,
      () => 2
    );
    const log = screen.getByRole("log");
    const turnPlayerMessage = getByText(log, /turno del jugador/i);
    expect(turnPlayerMessage).toBeInTheDocument();

    const enemyButton = screen.getByRole("button", { name: enemy.name });
    userEvent.click(enemyButton);
    const enemyLife = getByText(enemyButton, /vida: 30/i);
    const attackPlayerMessage = getByText(log, /ataque fallido del jugador/i);
    expect(enemyLife).toBeInTheDocument();
    expect(attackPlayerMessage).toBeInTheDocument();

    const turnEnemyMessage = getByText(log, /turno del enemigo/i);
    expect(turnEnemyMessage).toBeInTheDocument();

    const playerElement = screen.getByTestId("playerSection");
    const playerLife = getByText(playerElement, /vida: 50/i);
    const attackEnemyMessage = getByText(log, /ataque fallido del enemigo/i);
    expect(playerLife).toBeInTheDocument();
    expect(attackEnemyMessage).toBeInTheDocument();
  });
});

describe("Combat ends correctly", () => {
  it("Player wins", () => {
    const finishMock = Setup(
      () => 12,
      () => 3,
      () => 8,
      () => 3
    );
    const enemyButton = screen.getByRole("button", { name: enemy.name });
    for (let index = 0; index < 6; index++) {
      userEvent.click(enemyButton);
    }
    const enemyLife = getByText(enemyButton, /vida: 0/i);
    expect(enemyLife).toBeInTheDocument();
    expect(finishMock).toBeCalledWith("win");
  });
  it("Player lose", () => {
    const finishMock = Setup(
      () => 8,
      () => 2,
      () => 16,
      () => 3
    );
    const enemyButton = screen.getByRole("button", { name: enemy.name });
    for (let index = 0; index < 10; index++) {
      userEvent.click(enemyButton);
    }
    const playerElement = screen.getByTestId("playerSection");
    const playerLife = getByText(playerElement, /vida: 0/i);
    expect(playerLife).toBeInTheDocument();
    expect(finishMock).toBeCalledWith("lose");
  });
});

describe("tutorial modal works correctly", () => {
  it("tutorial modal is shown and closed on user click", async () => {
    Setup(
      () => 8,
      () => 2,
      () => 8,
      () => 2
    );
    const modalText = screen.getByText(
      /haz click en la carta del enemigo para atacarlo/i
    );
    expect(modalText).toBeInTheDocument();
    const buttonClose = screen.getByRole("button", { name: "cerrar" });
    userEvent.click(buttonClose);
    const buttonToDissapear = screen.queryByRole("button", { name: "cerrar" });
    expect(buttonToDissapear).toBeNull();
  });
});
