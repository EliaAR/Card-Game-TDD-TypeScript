import { render, screen } from "@testing-library/react";
import { CombatLog } from "./CombatLog";

describe("CombatLog works correctly", () => {
  it("There are messages and they are rendered", () => {
    render(
      <CombatLog messages={["El ataque falla", "Es el turno del enemigo"]} />
    );
    const Msg1 = screen.getByText(/el ataque falla/i);
    const Msg2 = screen.getByText(/es el turno del enemigo/i);
    expect(Msg1).toBeInTheDocument();
    expect(Msg2).toBeInTheDocument();
  });
  it("There aren't messages and default messages is rendered", () => {
    render(<CombatLog messages={[]} />);
    const defaultMsg = screen.getByText(/no hay entradas en el registro/i);
    expect(defaultMsg).toBeInTheDocument();
  });
});
