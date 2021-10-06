import { useState, useEffect } from "react";
import { Player } from "../Player/Player";
import { Enemy } from "../Enemy/Enemy";
import { Character } from "../Common/Types";
import { resolveCombat } from "../../Utils/resolveCombat";
import { CombatLog } from "../CombatLog/CombatLog";

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
  const [messages, setMessages] = useState<string[]>([]);
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
          "Turno del enemigo",
          `Ataque exitoso del enemigo, ${damageToPlayer} puntos de daño`,
        ]);
        setEnemyTurn(false);
      } else {
        setMessages([
          ...messages,
          "Turno del enemigo",
          "Ataque fallido del enemigo",
        ]);
        setEnemyTurn(false);
      }
    } else {
      setMessages([...messages, "Turno del jugador"]);
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
      <h1>Mazmorra {level}</h1>
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
              `Ataque exitoso del jugador, ${damageToEnemy} puntos de daño`,
            ]);
          } else {
            setMessages([...messages, "Ataque fallido del jugador"]);
          }
          setEnemyTurn(true);
        }}
        name={enemy.name}
        srcImg={enemy.srcImg}
        life={enemyLife}
        strength={enemy.strength}
        dexterity={enemy.dexterity}
      />
      <Player
        name={player.name}
        srcImg={player.srcImg}
        life={playerLife}
        strength={player.strength}
        dexterity={player.dexterity}
      />
      <CombatLog messages={messages} />
    </>
  );
}
export { Battlefield };
