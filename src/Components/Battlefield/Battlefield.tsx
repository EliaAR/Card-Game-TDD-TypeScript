import { useState, useEffect } from "react";
import { Player } from "../Common/Player/Player";
import { Enemy } from "../Common/Enemy/Enemy";
import { Character } from "../Common/Types";
import { resolveCombat } from "../../Utils/resolveCombat";
import { CombatLog } from "../CombatLog/CombatLog";

interface BattlefieldProps {
  enemy: Character;
  player: Character;
  onCombatFinish: (result: "win" | "lose") => void;
  roll20Enemy?: () => number;
  roll4Enemy?: () => number;
  roll20Player?: () => number;
  roll4Player?: () => number;
}

function Battlefield({
  enemy,
  player,
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
      const playerResultLife = playerLife > 0 ? playerLife - damageToPlayer : 0;
      setPlayerLife(playerResultLife);
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

  return (
    <>
      <Enemy
        onClickEnemy={() => {
          const damageToEnemy = resolveCombat(
            player.strength,
            enemy.dexterity,
            roll20Enemy,
            roll4Enemy
          );
          const enemyResultLife = enemyLife > 0 ? enemyLife - damageToEnemy : 0;
          setEnemyLife(enemyResultLife);
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
