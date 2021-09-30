interface PlayerProps {
  playerName: string;
  playerSrcImg: string;
  life: number;
  strength: number;
  dexterity: number;
}

function Player({
  playerName,
  playerSrcImg,
  life,
  strength,
  dexterity,
}: playerProps) {
  return (
    <section>
      <article>
        <p>{playerName}</p>
        <img src={playerSrcImg} alt="imagen de personaje" />
      </article>
      <article>
        <p>Vida: {life} </p>
        <p>Fuerza: {strength} </p>
        <p>Destreza: {dexterity} </p>
      </article>
    </section>
  );
}

export { Player };
