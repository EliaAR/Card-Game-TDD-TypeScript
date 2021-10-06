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
  roll20Enemy?: () => number;
  roll4Enemy?: () => number;
  roll20Player?: () => number;
  roll4Player?: () => number;
}

function Battlefield({
  enemy,
  player,
  level,
  onCombatFinish,
  roll20Enemy,
  roll4Enemy,
  roll20Player,
  roll4Player,
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
        roll20Player,
        roll4Player
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
            roll20Enemy,
            roll4Enemy
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
