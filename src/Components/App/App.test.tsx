import { render, screen, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { CharacterObject } from "../Common/Types";

const enemy: CharacterObject[] = new Array(4).fill({
  name: "erPatriarca",
  srcImg: "https://via.placeholder.com/150",
  life: 20,
  strength: 18,
  dexterity: 14,
});

const player: CharacterObject[] = new Array(4).fill({
  name: "laObrera",
  srcImg: "https://via.placeholder.com/150",
  life: 20,
  strength: 18,
  dexterity: 14,
});

function Setup(
  mockRoll20Enemy: () => number,
  mockRoll4Enemy: () => number,
  mockRoll20Player: () => number,
  mockRoll4Player: () => number
) {
  return render(
    <App
      mockRoll20Enemy={mockRoll20Enemy}
      mockRoll4Enemy={mockRoll4Enemy}
      mockRoll20Player={mockRoll20Player}
      mockRoll4Player={mockRoll4Player}
      mockEnemy={enemy}
      mockPlayer={player}
    />
  );
}

describe("game works correctly", () => {
  it("Player wins", () => {
    Setup(
      () => 12,
      () => 3,
      () => 8,
      () => 3
    );
    const buttonOnClick = screen.getByRole("button", { name: "Nueva partida" });
    userEvent.click(buttonOnClick);
    const enemyButton = screen.getByRole("button", { name: enemy[0].name });
    for (let index = 0; index < 6; index++) {
      userEvent.click(enemyButton);
    }
    const winMsg = screen.getByText(/victoria!!/i);
    const levelMsg = screen.getByText(/has alcanzado el nivel/i);
    expect(winMsg).toBeInTheDocument();
    expect(levelMsg).toBeInTheDocument();
    expect(levelMsg.textContent).toBe("Has alcanzado el nivel 2");

    const playButton = screen.getByRole("button", {
      name: "Continuar jugando",
    });
    userEvent.click(playButton);
    const playerElement = screen.getByTestId("playerSection");
    const playerName = getByText(playerElement, player[0].name);
    expect(playerName).toBeInTheDocument();
  });
  it("Player lose", () => {
    Setup(
      () => 8,
      () => 2,
      () => 16,
      () => 3
    );
    const buttonOnClick = screen.getByRole("button", {
      name: "Nueva partida",
    });
    userEvent.click(buttonOnClick);
    const enemyButton = screen.getByRole("button", { name: enemy[0].name });
    for (let index = 0; index < 10; index++) {
      userEvent.click(enemyButton);
    }
    const loseMsg = screen.getByText(/has perdido 😢/i);
    expect(loseMsg).toBeInTheDocument();

    const playButton = screen.getByRole("button", {
      name: "Intentarlo de nuevo",
    });
    userEvent.click(playButton);
    const playerElement = screen.getByTestId("playerSection");
    const playerName = getByText(playerElement, player[0].name);
    expect(playerName).toBeInTheDocument();
  });
  it("Player wins the game", () => {
    Setup(
      () => 12,
      () => 3,
      () => 8,
      () => 3
    );
    const buttonOnClick = screen.getByRole("button", {
      name: "Nueva partida",
    });
    userEvent.click(buttonOnClick);
    for (let i = 0; i < 4; i++) {
      const enemyButton = screen.getByRole("button", { name: enemy[0].name });
      for (let j = 0; j < 6; j++) {
        userEvent.click(enemyButton);
      }
      if (i < 3) {
        const playButton = screen.getByRole("button", {
          name: "Continuar jugando",
        });
        userEvent.click(playButton);
      }
    }
    const winGameMsg = screen.getByText(/has completado el juego!!/i);
    expect(winGameMsg).toBeInTheDocument();

    const playFinalButton = screen.getByRole("button", {
      name: "Volver a jugar",
    });
    userEvent.click(playFinalButton);
    const playerElement = screen.getByTestId("playerSection");
    const playerName = getByText(playerElement, player[0].name);
    expect(playerName).toBeInTheDocument();
  });
});
