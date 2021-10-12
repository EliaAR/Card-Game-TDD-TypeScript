import { Character } from "../Common/Types";
import "./Enemy.scss";

interface EnemyProps extends Character {
  onClickEnemy: React.MouseEventHandler<HTMLElement>;
  level: number;
  maxLife: number;
}

function Enemy({
  onClickEnemy,
  name,
  srcImg,
  life,
  maxLife,
  strength,
  dexterity,
  level,
}: EnemyProps) {
  return (
    <article
      onClick={onClickEnemy}
      role="button"
      aria-label={name}
      className="enemy"
    >
      <h2 className={`enemy__category enemy__category--level${level}`}>
        Enemigo
      </h2>
      <div className={`enemy__container enemy__container--level${level}`}>
        <article>
          <p className={`enemy__name enemy__name--level${level}`}>{name}</p>
          <img
            src={srcImg}
            alt={`Imagen ${name}`}
            title={name}
            className="enemy__image"
          />
        </article>
        <article className="enemy__statsContainer">
          <p>
            Vida: {life} / {maxLife}
          </p>
          <p>Fuerza: {strength} </p>
          <p>Destreza: {dexterity} </p>
        </article>
      </div>
    </article>
  );
}

export { Enemy };
