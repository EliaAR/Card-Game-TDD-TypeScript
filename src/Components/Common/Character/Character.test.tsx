import { render, screen } from "@testing-library/react";
import { Character } from "./Character";

function Setup() {
  return render(
    <Character
      nameCharacter="Nombre del personaje"
      srcImgCharacter="https://via.placeholder.com/150"
      life={7}
      strength={8}
      dexterity={9}
    />
  );
}

describe("character is display corretly", () => {
  it("name is shown", () => {
    Setup();
    const nameCharacter = screen.getByText(/nombre del personaje/i);

    expect(nameCharacter).toBeInTheDocument();
  });
  it("image is shown", () => {
    Setup();
    const characterImg = screen.getByAltText(
      /imagen de personaje/i
    ) as HTMLImageElement;

    expect(characterImg.src).toBe("https://via.placeholder.com/150");
  });
  it("stats are shown", () => {
    Setup();
    const life = screen.getByText(/vida: 7/i);
    const strength = screen.getByText(/fuerza: 8/i);
    const dexterity = screen.getByText(/destreza: 9/i);

    expect(life).toBeInTheDocument();
    expect(strength).toBeInTheDocument();
    expect(dexterity).toBeInTheDocument();
  });
});
