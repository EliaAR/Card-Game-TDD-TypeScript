import { Character } from "../Common/Types";

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
    <section onClick={onClickEnemy} role="button" aria-label={name}>
      <article>
        <p>{name}</p>
        <img src={srcImg} alt={`Imagen ${name}`} />
      </article>
      <article>
        <p>Vida: {life} </p>
        <p>Fuerza: {strength} </p>
        <p>Destreza: {dexterity} </p>
      </article>
    </section>
  );
}

export { Enemy };
