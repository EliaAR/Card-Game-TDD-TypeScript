import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Modal } from "./Modal";

describe("modal works correctly", () => {
  it("modal shows the children and a close button", () => {
    const mockClose = jest.fn();
    render(
      <Modal onCloseModal={mockClose}>
        <div>Relleno</div>
      </Modal>
    );
    const divText = screen.getByText(/relleno/i);
    expect(divText).toBeInTheDocument();
    const buttonClose = screen.getByRole("button", { name: "cerrar" });
    userEvent.click(buttonClose);
    const divOverlay = screen.getByTestId("modal-overlay");
    userEvent.click(divOverlay);
    expect(mockClose).toHaveBeenCalledTimes(2);
  });
});
