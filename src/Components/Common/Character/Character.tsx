interface CharacterProps {
  srcImgCharacter: string;
  life: number;
  strength: number;
  dexterity: number;
}

function Character({
  srcImgCharacter,
  life,
  strength,
  dexterity,
}: CharacterProps) {
  return (
    <section>
      <img src={srcImgCharacter} alt="imagen de personaje" />
      <article>
        <p>Vida: {life} </p>
        <p>Fuerza: {strength} </p>
        <p>Destreza: {dexterity} </p>
      </article>
    </section>
  );
}

export { Character };
