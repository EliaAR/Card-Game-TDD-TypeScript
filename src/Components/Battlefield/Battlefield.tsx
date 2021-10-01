import { useState } from "react";
import { Player } from "../Common/Player/Player";
import { Enemy } from "../Common/Enemy/Enemy";
import { Character } from "../Common/Types";
import { resolveCombat } from "../../Utils/resolveCombat";
import { CombatLog } from "../CombatLog/CombatLog";

interface BattlefieldProps {
  enemy: Character;
  player: Character;
  roll20?: () => number;
  roll4?: () => number;
}

function Battlefield({ enemy, player, roll20, roll4 }: BattlefieldProps) {
  const [life, setLife] = useState(enemy.life);
  const [messages, setMessages] = useState<string[]>([]);
  return (
    <>
      <Enemy
        onClickEnemy={() => {
          const damage = resolveCombat(
            player.strength,
            enemy.dexterity,
            roll20,
            roll4
          );
          setLife(life - damage);
          if (damage) {
            setMessages([
              ...messages,
              `Ataque exitoso, ${damage} puntos de daño`,
            ]);
          } else {
            setMessages([...messages, "Ataque fallido"]);
          }
        }}
        name={enemy.name}
        srcImg={enemy.srcImg}
        life={life}
        strength={enemy.strength}
        dexterity={enemy.dexterity}
      />
      <Player
        name={player.name}
        srcImg={player.srcImg}
        life={player.life}
        strength={player.strength}
        dexterity={player.dexterity}
      />
      <CombatLog messages={messages} />
    </>
  );
}
export { Battlefield };
