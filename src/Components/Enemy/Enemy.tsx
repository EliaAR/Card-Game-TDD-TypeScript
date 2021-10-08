import { Character } from "../Common/Types";
import "./Enemy.scss";

interface EnemyProps extends Character {
  onClickEnemy: React.MouseEventHandler<HTMLElement>;
}

function Enemy({
  onClickEnemy,
  name,
  srcImg,
  life,
  strength,
  dexterity,
}: EnemyProps) {
  return (
    <article
      onClick={onClickEnemy}
      role="button"
      aria-label={name}
      className="enemy"
    >
      <h2 className="enemy__category">Enemigo</h2>
      <div className="enemy__container">
        <article>
          <p className="enemy__name">{name}</p>
          <img
            src={srcImg}
            alt={`Imagen ${name}`}
            title={name}
            className="enemy__image"
          />
        </article>
        <article className="enemy__statsContainer">
          <p>Vida: {life} </p>
          <p>Fuerza: {strength} </p>
          <p>Destreza: {dexterity} </p>
        </article>
      </div>
    </article>
  );
}

export { Enemy };
