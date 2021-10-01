import { Character } from "../Types";

interface PlayerProps extends Character {}

function Player({ name, srcImg, life, strength, dexterity }: PlayerProps) {
  return (
    <section>
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

export { Player };
