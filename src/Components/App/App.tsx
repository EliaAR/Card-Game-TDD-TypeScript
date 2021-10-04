import { useState } from "react";
import { Character } from "../Common/Types";
import { Battlefield } from "../Battlefield/Battlefield";
import "./App.css";

type Screens = "win" | "lose" | "battle";

const elf: Character = {
  name: "pendiente",
  srcImg: "https://via.placeholder.com/150",
  life: 20,
  strength: 18,
  dexterity: 14,
};
const orc: Character = {
  name: "pendienta",
  srcImg: "https://via.placeholder.com/150",
  life: 20,
  strength: 18,
  dexterity: 14,
};

interface AppProps {
  roll20Enemy?: () => number;
  roll4Enemy?: () => number;
  roll20Player?: () => number;
  roll4Player?: () => number;
}

function App({ roll20Enemy, roll4Enemy, roll20Player, roll4Player }: AppProps) {
  const [screen, setScreen] = useState<Screens>("battle");

  if (screen === "win") {
    return (
      <>
        <p>Has ganado!!</p>
        <button onClick={() => setScreen("battle")}>Volver a jugar</button>
      </>
    );
  } else if (screen === "lose") {
    return (
      <>
        <p>Has perdido 😢</p>
        <button onClick={() => setScreen("battle")}>Volver a jugar</button>
      </>
    );
  } else {
    return (
      <Battlefield
        enemy={elf}
        player={orc}
        onCombatFinish={(combatResult) => {
          if (combatResult === "win") {
            setScreen("win");
          } else {
            setScreen("lose");
          }
        }}
        roll20Enemy={roll20Enemy}
        roll4Enemy={roll4Enemy}
        roll20Player={roll20Player}
        roll4Player={roll4Player}
      />
    );
  }
}

export { App };
