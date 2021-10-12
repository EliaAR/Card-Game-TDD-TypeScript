import "./HomePage.scss";

interface HomePageProps {
  onClickStart: () => void;
}

function HomePage({ onClickStart }: HomePageProps) {
  return (
    <main className="mainHomepage">
      <section className="mainHomepage__text">
        <p className="mainHomepage__gameTitle">Truthy, The Card Game</p>
        <p className="mainHomepage__gameCompany">Andar x Casa Productions®</p>
        <p className="mainHomepage__gameSubtitle">
          El juego de cartas donde podrás combatir con los verdaderos héroes que
          luchan contra sus opresores
        </p>
      </section>
      <section>
        <button onClick={onClickStart} className="mainHomepage__button">
          Nueva partida
        </button>
      </section>
    </main>
  );
}

export { HomePage };
