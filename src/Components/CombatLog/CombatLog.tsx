interface CombatLogProps {
  messages: string[];
}

function CombatLog({ messages }: CombatLogProps) {
  return (
    <section role="log">
      <p>Registro de combate</p>
      {messages.length ? (
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        <p>No hay entradas en el registro</p>
      )}
    </section>
  );
}
export { CombatLog };
