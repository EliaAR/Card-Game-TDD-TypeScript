interface EnemyProps {
  onClickEnemy: React.MouseEventHandler<HTMLElement>;
  enemyName: string;
  enemySrcImg: string;
  life: number;
  strength: number;
  dexterity: number;
}

function Enemy({
  onClickEnemy,
  enemyName,
  enemySrcImg,
  life,
  strength,
  dexterity,
}: EnemyProps) {
  return (
    <section
      onClick={onClickEnemy}
      role="button"
      aria-label="nombre del enemigo"
    >
      <article>
        <p>{enemyName}</p>
        <img src={enemySrcImg} alt="imagen de enemigo" />
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
