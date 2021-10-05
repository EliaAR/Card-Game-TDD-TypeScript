import { render, screen, getByText } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

function Setup(
  mock20Enemy: () => number,
  mock4Enemy: () => number,
  mock20Player: () => number,
  mock4Player: () => number
) {
  return render(
    <App
      roll20Enemy={mock20Enemy}
      roll4Enemy={mock4Enemy}
      roll20Player={mock20Player}
      roll4Player={mock4Player}
    />
  );
}

describe("Combat ends correctly", () => {
  it("Player wins", () => {
    Setup(
      () => 12,
      () => 3,
      () => 8,
      () => 3
    );
    const enemyButton = screen.getByRole("button", { name: "pendiente" });
    for (let index = 0; index < 6; index++) {
      userEvent.click(enemyButton);
    }
    const winMsg = screen.getByText(/victoria!! has alcanzado el nivel 2/i);
    expect(winMsg).toBeInTheDocument();

    const playButton = screen.getByRole("button", {
      name: "Continuar jugando",
    });
    userEvent.click(playButton);
    const playerElement = screen.getByTestId("playerSection");
    const playerName = getByText(playerElement, /pendienta/i);
    expect(playerName).toBeInTheDocument();
  });
  it("Player lose", () => {
    Setup(
      () => 8,
      () => 2,
      () => 16,
      () => 3
    );
    const enemyButton = screen.getByRole("button", { name: "pendiente" });
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
    const playerName = getByText(playerElement, /pendienta/i);
    expect(playerName).toBeInTheDocument();
  });
  it("Player wins the game", () => {
    Setup(
      () => 12,
      () => 3,
      () => 8,
      () => 3
    );
    for (let i = 0; i < 4; i++) {
      const enemyButton = screen.getByRole("button", { name: "pendiente" });
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
    expect(playFinalButton).toBeInTheDocument();
  });
});
