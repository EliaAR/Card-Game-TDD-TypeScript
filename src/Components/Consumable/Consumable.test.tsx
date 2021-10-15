import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Consumable } from "./Consumable";

function SetUp() {
  const mockOnClickConsumable = jest.fn();
  render(
    <Consumable
      onClickConsumable={mockOnClickConsumable}
      name="Poción salud"
      srcImg="https://via.placeholder.com/150"
      number={2}
    />
  );
  return mockOnClickConsumable;
}

describe("Consumable works correctly", () => {
  it("Name is shown", () => {
    SetUp();
    const consumableName = screen.getByText(/poción salud/i);
    expect(consumableName).toBeInTheDocument();
  });
  it("Image is shown", () => {
    SetUp();
    const consumableImg = screen.getByAltText(/imagen poción salud/i);
    expect(consumableImg).toBeInTheDocument();
  });
  it("Number of remaining consumables is shown", () => {
    SetUp();
    const consumableRemaining = screen.getByText(/nº2/i);
    expect(consumableRemaining).toBeInTheDocument();
  });
  it("when click on consumable onClickConsumable is called", () => {
    const onClickMock = SetUp();
    const consumableButton = screen.getByRole("button", {
      name: /poción salud/i,
    });
    userEvent.click(consumableButton);
    expect(onClickMock).toHaveBeenCalled();
  });
});
