import { useState } from "react";
import { Battlefield } from "../Battlefield/Battlefield";
import { player, enemy } from "../../Data/characters";
import { Character } from "../Common/Types";
import "./App.scss";

type Screens = "win-battle" | "win-game" | "lose" | "battle";

interface AppProps {
  mockRoll20Enemy?: () => number;
  mockRoll4Enemy?: () => number;
  mockRoll20Player?: () => number;
  mockRoll4Player?: () => number;
  mockEnemy?: Character[];
  mockPlayer?: Character[];
}

function App({
  mockRoll20Enemy,
  mockRoll4Enemy,
  mockRoll20Player,
  mockRoll4Player,
  mockEnemy,
  mockPlayer,
}: AppProps) {
  const [screen, setScreen] = useState<Screens>("battle");
  const [level, setLevel] = useState(1);

  if (screen === "win-battle") {
    return (
      <main className="mainApp mainAppWinB">
        <p className="mainApp__text mainApp__resultMsg">Victoria!!</p>
        <p className="mainApp__text">
          Has alcanzado el nivel <span className="mainApp__level">{level}</span>
        </p>
        <button onClick={() => setScreen("battle")} className="mainApp__button">
          Continuar jugando
        </button>
      </main>
    );
  } else if (screen === "lose") {
    return (
      <main className="mainApp mainAppLose">
        <p className="mainApp__text mainApp__resultMsg">Has perdido 😢</p>
        <button onClick={() => setScreen("battle")} className="mainApp__button">
          Intentarlo de nuevo
        </button>
      </main>
    );
  } else if (screen === "win-game") {
    return (
      <main className="mainApp mainAppWinG">
        <div className="mainAppWinG__fireworks">
          <div className="mainAppWinG__fireworks--before"></div>
          <div className="mainAppWinG__fireworks--after"></div>
        </div>
        <p className="mainAppWinG__text">Has completado el juego!!</p>
        <button onClick={() => setScreen("battle")} className="mainApp__button">
          Volver a jugar
        </button>
      </main>
    );
  } else {
    return (
      <Battlefield
        enemy={mockEnemy ? mockEnemy[level - 1] : enemy[level - 1]}
        player={mockPlayer ? mockPlayer[level - 1] : player[level - 1]}
        level={level}
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
        mockRoll20Enemy={mockRoll20Enemy}
        mockRoll4Enemy={mockRoll4Enemy}
        mockRoll20Player={mockRoll20Player}
        mockRoll4Player={mockRoll4Player}
      />
    );
  }
}

export { App };
