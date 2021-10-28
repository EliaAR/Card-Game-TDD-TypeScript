import { useState, useEffect } from "react";
import { Header } from "../Header/Header";
import { Enemy } from "../Enemy/Enemy";
import { Player } from "../Player/Player";
import { Consumable } from "../Consumable/Consumable";
import { resolveCombat } from "../../Utils/resolveCombat";
import { CombatLog } from "../CombatLog/CombatLog";
import { Modal } from "../Common/Modal/Modal";
import {
  CharacterObject,
  MessageObject,
  ConsumableObject,
} from "../Common/Types";
import "./Battlefield.scss";

interface BattlefieldProps {
  enemy: CharacterObject;
  player: CharacterObject;
  healthPotion: ConsumableObject;
  level: number;
  currentAmountPotions: number;
  setCurrentAmountPotions: React.Dispatch<React.SetStateAction<number>>;
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
  healthPotion,
  currentAmountPotions,
  setCurrentAmountPotions,
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
  const [tutorialModal, setTutorialModal] = useState(level === 1);

  useEffect(() => {
    if (enemyTurn) {
      const {
        damage,
        resultD20,
        resultD4,
        strengthModifier,
        dexterityModifier,
      } = resolveCombat(
        enemy.strength,
        player.dexterity,
        mockRoll20Player,
        mockRoll4Player
      );
      const playerResultLife = playerLife - damage;
      setPlayerLife(playerResultLife > 0 ? playerResultLife : 0);
      if (damage) {
        setMessages([
          ...messages,
          { text: "Turno del enemigo", type: "enemyTurn" },
          {
            text: `- Tirada ataque: ${resultD20} + ${strengthModifier}. Ataque exitoso del enemigo`,
            type: "attack",
          },
          {
            text: `- Tirada daño: ${resultD4} + ${strengthModifier}. Te hace ${damage} puntos de daño`,
            type: "attack",
          },
        ]);
        setEnemyTurn(false);
      } else {
        setMessages([
          ...messages,
          { text: "Turno del enemigo", type: "enemyTurn" },
          {
            text: `- Tirada ataque: ${resultD20} + ${strengthModifier}. Ataque fallido del enemigo`,
            type: "attack",
          },
        ]);
        setEnemyTurn(false);
      }
    } else {
      setMessages([...messages, { text: "Tu turno", type: "playerTurn" }]);
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
      {tutorialModal ? (
        <Modal onCloseModal={() => setTutorialModal(false)}>
          <p className="modalParagraph">
            Haz click en la carta del enemigo para atacarlo
          </p>
        </Modal>
      ) : null}
      <Header level={level} />
      <main className={`main main--background${level}`}>
        <section className="main__charactersContainer">
          <Enemy
            onClickEnemy={() => {
              const {
                damage,
                resultD20,
                resultD4,
                strengthModifier,
                dexterityModifier,
              } = resolveCombat(
                player.strength,
                enemy.dexterity,
                mockRoll20Enemy,
                mockRoll4Enemy
              );
              const enemyResultLife = enemyLife - damage;
              setEnemyLife(enemyResultLife > 0 ? enemyResultLife : 0);
              if (damage) {
                setMessages([
                  ...messages,
                  {
                    text: `- Tirada ataque: ${resultD20} + ${strengthModifier}. Tu ataque es exitoso!`,
                    type: "attack",
                  },
                  {
                    text: `- Tirada daño: ${resultD4} + ${strengthModifier}. Haces ${damage} puntos de daño!`,
                    type: "attack",
                  },
                ]);
              } else {
                setMessages([
                  ...messages,
                  {
                    text: `- Tirada ataque: ${resultD20} + ${strengthModifier}. Tu ataque falla`,
                    type: "attack",
                  },
                ]);
              }
              setEnemyTurn(true);
            }}
            name={enemy.name}
            srcImg={enemy.srcImg}
            life={enemyLife}
            maxLife={enemy.life}
            strength={enemy.strength}
            dexterity={enemy.dexterity}
            level={level}
          />
          <Player
            name={player.name}
            srcImg={player.srcImg}
            life={playerLife}
            maxLife={player.life}
            strength={player.strength}
            dexterity={player.dexterity}
          />
          <Consumable
            onClickConsumable={() => {
              if (playerLife < player.life) {
                if (playerLife <= player.life - 10) {
                  setPlayerLife(playerLife + 10);
                  setMessages([
                    ...messages,
                    {
                      text: "- Usas poti de vida → +10 puntos de vida",
                      type: "consumable",
                    },
                  ]);
                } else {
                  let remainingPlayerLife = player.life - playerLife;
                  setPlayerLife(playerLife + remainingPlayerLife);
                  setMessages([
                    ...messages,
                    {
                      text: `- Usas poti de vida → ${remainingPlayerLife} puntos de vida`,
                      type: "consumable",
                    },
                  ]);
                }
              } else {
                setPlayerLife(playerLife);
                setMessages([
                  ...messages,
                  {
                    text: "- Tienes demasiada vida para usar poti",
                    type: "consumable",
                  },
                ]);
              }
              if (currentAmountPotions > 0 && currentAmountPotions <= 3) {
                setCurrentAmountPotions(currentAmountPotions - 1);
                setEnemyTurn(true);
              } else {
                setCurrentAmountPotions(currentAmountPotions);
              }
            }}
            name={healthPotion.name}
            srcImg={healthPotion.srcImg}
            number={currentAmountPotions}
            consumableDisabled={currentAmountPotions === 0}
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
