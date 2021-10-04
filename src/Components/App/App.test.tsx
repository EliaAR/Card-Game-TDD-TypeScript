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
    const winMsg = screen.getByText(/has ganado!!/i);
    expect(winMsg).toBeInTheDocument();
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
  });
});
