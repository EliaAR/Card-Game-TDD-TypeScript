interface HomePageProps {
  onClickStart: () => void;
}

function HomePage({ onClickStart }: HomePageProps) {
  return (
    <>
      <section>
        <p>Truthy, The Card Game</p>
        <p>Andar x Casa Productions®</p>
        <p>
          El juego de cartas donde podrás combatir con los verdaderos héroes que
          luchan contra sus opresores
        </p>
      </section>
      <section>
        <button onClick={onClickStart}>Nueva partida</button>
      </section>
    </>
  );
}

export { HomePage };
