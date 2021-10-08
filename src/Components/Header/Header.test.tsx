import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header is display correctly", () => {
  it("Title is shown", () => {
    render(<Header level={3} />);
    const headerTitle = screen.getByText(/mazomorra 3/i);
    expect(headerTitle).toBeInTheDocument();
  });
});
