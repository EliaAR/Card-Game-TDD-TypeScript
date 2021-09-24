interface CharacterProps {
  nameCharacter: string;
  srcImgCharacter: string;
  life: number;
  strength: number;
  dexterity: number;
}

function Character({
  nameCharacter,
  srcImgCharacter,
  life,
  strength,
  dexterity,
}: CharacterProps) {
  return (
    <section>
      <article>
        <p>{nameCharacter}</p>
        <img src={srcImgCharacter} alt="imagen de personaje" />
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
