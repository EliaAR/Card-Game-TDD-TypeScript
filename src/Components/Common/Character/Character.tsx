interface CharacterProps {
  life: number;
  strength: number;
  dexterity: number;
}

function Character({ life, strength, dexterity }: CharacterProps) {
  return (
    <div>
      <p>Vida: {life} </p>
      <p>Fuerza: {strength} </p>
      <p>Destreza: {dexterity} </p>
    </div>
  );
}

export { Character };
