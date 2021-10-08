import { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Player } from "../Player/Player";
import { Enemy } from "../Enemy/Enemy";
import { Character, MessageObject } from "../Common/Types";
import { resolveCombat } from "../../Utils/resolveCombat";
import { CombatLog } from "../CombatLog/CombatLog";
import "./Battlefield.scss";

interface BattlefieldProps {
  enemy: Character;
  player: Character;
  level: number;
  onCombatFinish: (result: "win" | "lose") => void;
  mockRoll20Enemy?: () => number;
  mockRoll4Enemy?: () => number;
  mockRoll20Player?: () => number;
  mockRoll4Player?: () => number;
}

function Battlefield({
  enemy,
  player,
  level,
  onCombatFinish,
  mockRoll20Enemy,
  mockRoll4Enemy,
  mockRoll20Player,
  mockRoll4Player,
}: BattlefieldProps) {
  const [enemyLife, setEnemyLife] = useState(enemy.life);
  const [messages, setMessages] = useState<MessageObject[]>([]);
  const [playerLife, setPlayerLife] = useState(player.life);
  const [enemyTurn, setEnemyTurn] = useState(false);

  useEffect(() => {
    if (enemyTurn) {
      const damageToPlayer = resolveCombat(
        enemy.strength,
        player.dexterity,
        mockRoll20Player,
        mockRoll4Player
      );
      const playerResultLife = playerLife - damageToPlayer;
      setPlayerLife(playerResultLife > 0 ? playerResultLife : 0);
      if (damageToPlayer) {
        setMessages([
          ...messages,
          { text: "Turno del enemigo", type: "enemyTurn" },
          {
            text: `Ataque exitoso del enemigo, ${damageToPlayer} puntos de daño`,
            type: "attack",
          },
        ]);
        setEnemyTurn(false);
      } else {
        setMessages([
          ...messages,
          { text: "Turno del enemigo", type: "enemyTurn" },
          { text: "Ataque fallido del enemigo", type: "attack" },
        ]);
        setEnemyTurn(false);
      }
    } else {
      setMessages([
        ...messages,
        { text: "Turno del jugador", type: "playerTurn" },
      ]);
    }
  }, [enemyTurn]);

  useEffect(() => {
    if (!playerLife) {
      onCombatFinish("lose");
    }
    if (!enemyLife) {
      onCombatFinish("win");
    }
  }, [playerLife, enemyLife, onCombatFinish]);

  return (
    <>
      <Header level={level} />
      <main className={`main main--background${level}`}>
        <section className="main__charactersContainer">
          <Enemy
            onClickEnemy={() => {
              const damageToEnemy = resolveCombat(
                player.strength,
                enemy.dexterity,
                mockRoll20Enemy,
                mockRoll4Enemy
              );
              const enemyResultLife = enemyLife - damageToEnemy;
              setEnemyLife(enemyResultLife > 0 ? enemyResultLife : 0);
              if (damageToEnemy) {
                setMessages([
                  ...messages,
                  {
                    text: `Ataque exitoso del jugador, ${damageToEnemy} puntos de daño`,
                    type: "attack",
                  },
                ]);
              } else {
                setMessages([
                  ...messages,
                  { text: "Ataque fallido del jugador", type: "attack" },
                ]);
              }
              setEnemyTurn(true);
            }}
            name={enemy.name}
            srcImg={enemy.srcImg}
            life={enemyLife}
            strength={enemy.strength}
            dexterity={enemy.dexterity}
            level={level}
          />
          <Player
            name={player.name}
            srcImg={player.srcImg}
            life={playerLife}
            strength={player.strength}
            dexterity={player.dexterity}
            level={level}
          />
        </section>
        <section className="main__combatlogContainer">
          <CombatLog messages={messages} />
        </section>
      </main>
    </>
  );
}
export { Battlefield };
