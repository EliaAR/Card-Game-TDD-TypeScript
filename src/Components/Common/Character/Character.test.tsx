import { render, screen } from "@testing-library/react";
import { Character } from "./Character";

function Setup() {
  return render(
    <Character
      srcImgCharacter="https://via.placeholder.com/150"
      life={7}
      strength={8}
      dexterity={9}
    />
  );
}

describe("character is display corretly", () => {
  it("image is shown", () => {
    Setup();
    const CharacterImg = screen.getByAltText(
      /imagen de personaje/i
    ) as HTMLImageElement;

    expect(CharacterImg.src).toBe("https://via.placeholder.com/150");
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
