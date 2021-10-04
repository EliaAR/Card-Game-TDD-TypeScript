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
  mock20Enemy: () => number,
  mock4Enemy: () => number,
  mock20Player: () => number,
  mock4Player: () => number
) {
  return render(
    <Battlefield
      enemy={enemy}
      player={player}
      roll20Enemy={mock20Enemy}
      roll4Enemy={mock4Enemy}
      roll20Player={mock20Player}
      roll4Player={mock4Player}
    />
  );
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
    Setup(
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
  });
  it("Player lose", () => {
    Setup(
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
  });
});
