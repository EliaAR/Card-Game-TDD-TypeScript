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
    <section
      onClick={onClickEnemy}
      role="button"
      aria-label={name}
      className="enemy"
    >
      <article>
        <p className="enemy__name">{name}</p>
        <img src={srcImg} alt={`Imagen ${name}`} />
      </article>
      <article className="enemy__statsContainer">
        <p>Vida: {life} </p>
        <p>Fuerza: {strength} </p>
        <p>Destreza: {dexterity} </p>
      </article>
    </section>
  );
}

export { Enemy };
