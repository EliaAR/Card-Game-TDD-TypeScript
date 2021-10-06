import "./CombatLog.scss";

interface CombatLogProps {
  messages: string[];
}

function CombatLog({ messages }: CombatLogProps) {
  return (
    <section role="log" className="combatLog">
      <p className="combatLog__tittle">Registro de combate</p>
      {messages.length ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index} className="combatLog__msg">
              {message}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay entradas en el registro</p>
      )}
    </section>
  );
}
export { CombatLog };
