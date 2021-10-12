import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { HomePage } from "./HomePage";

function Setup() {
  const mockOnClickStart = jest.fn();
  render(<HomePage onClickStart={mockOnClickStart} />);
  return mockOnClickStart;
}

describe("HomePage works correctly", () => {
  it("title is shown", () => {
    Setup();
    const gameTitle = screen.getByText(/truthy, the card game/i);
    expect(gameTitle).toBeInTheDocument();
  });
  it("company is shown", () => {
    Setup();
    const gameCompany = screen.getByText(/andar x casa productions®/i);
    expect(gameCompany).toBeInTheDocument();
  });
  it("subtitle is shown", () => {
    Setup();
    const gameSubtitle = screen.getByText(
      /el juego de cartas donde podrás combatir con los verdaderos héroes que luchan contra sus opresores/i
    );
    expect(gameSubtitle).toBeInTheDocument();
  });
  it("when click on button onClickStart is called", () => {
    const mockOnClickStart = Setup();
    const buttonStart = screen.getByRole("button", { name: "Nueva partida" });
    userEvent.click(buttonStart);
    expect(mockOnClickStart).toHaveBeenCalled();
  });
});
