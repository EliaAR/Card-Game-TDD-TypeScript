import { useState } from "react";
import { Battlefield } from "../Battlefield/Battlefield";
import { player, enemy } from "../../Data/characters";
import { Character } from "../Common/Types";
import "./App.css";

type Screens = "win-battle" | "win-game" | "lose" | "battle";

interface AppProps {
  mock20Enemy?: () => number;
  mock4Enemy?: () => number;
  mock20Player?: () => number;
  mock4Player?: () => number;
  mockEnemy?: Character[];
  mockPlayer?: Character[];
}

function App({
  mock20Enemy,
  mock4Enemy,
  mock20Player,
  mock4Player,
  mockEnemy,
  mockPlayer,
}: AppProps) {
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
        enemy={mockEnemy ? mockEnemy[level - 1] : enemy[level - 1]}
        player={mockPlayer ? mockPlayer[level - 1] : player[level - 1]}
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
        roll20Enemy={mock20Enemy}
        roll4Enemy={mock4Enemy}
        roll20Player={mock20Player}
        roll4Player={mock4Player}
      />
    );
  }
}

export { App };
