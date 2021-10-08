interface HeaderProps {
  level: number;
}

function Header({ level }: HeaderProps) {
  return (
    <section>
      <h1 className="main__tittle">Mazmorra {level}</h1>
    </section>
  );
}

export { Header };
