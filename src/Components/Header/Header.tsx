import "./Header.scss";

interface HeaderProps {
  level: number;
}

function Header({ level }: HeaderProps) {
  return (
    <section className="header">
      <h1 className="header__title">Mazmorra {level}</h1>
    </section>
  );
}

export { Header };
