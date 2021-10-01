import { useState } from "react";
import { Player } from "../Common/Player/Player";
import { Enemy } from "../Common/Enemy/Enemy";
import { Character } from "../Common/Types";
import { resolveCombat } from "../../Utils/resolveCombat";

interface BattlefieldProps {
  enemy: Character;
  player: Character;
  roll20?: () => number;
  roll4?: () => number;
}

function Battlefield({ enemy, player, roll20, roll4 }: BattlefieldProps) {
  const [life, setLife] = useState(enemy.life);
  return (
    <>
      <Enemy
        onClickEnemy={() =>
          setLife(
            life -
              resolveCombat(player.strength, enemy.dexterity, roll20, roll4)
          )
        }
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
    </>
  );
}
export { Battlefield };
