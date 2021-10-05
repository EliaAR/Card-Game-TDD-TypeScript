import { useState } from "react";
import { Character } from "../Common/Types";
import { Battlefield } from "../Battlefield/Battlefield";
import "./App.css";

type Screens = "win-battle" | "win-game" | "lose" | "battle";

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
  const [level, setLevel] = useState(1);

  if (screen === "win-battle") {
    return (
      <>
        <p>Victoria!! Has alcanzado el nivel {level}</p>
        <button onClick={() => setScreen("battle")}>Continuar jugando</button>
      </>
    );
  } else if (screen === "lose") {
    return (
      <>
        <p>Has perdido 😢</p>
        <button onClick={() => setScreen("battle")}>Intentarlo de nuevo</button>
      </>
    );
  } else if (screen === "win-game") {
    return (
      <>
        <p>Has completado el juego!!</p>
        <button onClick={() => setScreen("battle")}>Volver a jugar</button>
      </>
    );
  } else {
    return (
      <Battlefield
        enemy={elf}
        player={orc}
        onCombatFinish={(combatResult) => {
          if (combatResult === "win" && level < 4) {
            setScreen("win-battle");
            setLevel(level + 1);
          } else if (combatResult === "win" && level === 4) {
            setScreen("win-game");
            setLevel(1);
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
