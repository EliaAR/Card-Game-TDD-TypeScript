import { Character } from "../Common/Types";
import "./Player.scss";

interface PlayerProps extends Character {}

function Player({ name, srcImg, life, strength, dexterity }: PlayerProps) {
  return (
    <article data-testid="playerSection" className="player">
      <h2>Jugadora</h2>
      <article>
        <p className="player__name">{name}</p>
        <img
          src={srcImg}
          alt={`Imagen ${name}`}
          title={name}
          className="player__image"
        />
      </article>
      <article className="player__statsContainer">
        <p>Vida: {life} </p>
        <p>Fuerza: {strength} </p>
        <p>Destreza: {dexterity} </p>
      </article>
    </article>
  );
}

export { Player };
