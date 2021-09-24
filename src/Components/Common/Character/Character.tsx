interface CharacterProps {
  characterName: string;
  characterSrcImg: string;
  life: number;
  strength: number;
  dexterity: number;
}

function Character({
  characterName,
  characterSrcImg,
  life,
  strength,
  dexterity,
}: CharacterProps) {
  return (
    <section>
      <article>
        <p>{characterName}</p>
        <img src={characterSrcImg} alt="imagen de personaje" />
      </article>
      <article>
        <p>Vida: {life} </p>
        <p>Fuerza: {strength} </p>
        <p>Destreza: {dexterity} </p>
      </article>
    </section>
  );
}

export { Character };
