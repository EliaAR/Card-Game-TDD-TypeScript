import { MessageObject } from "../Common/Types";
import "./CombatLog.scss";

interface CombatLogProps {
  messages: MessageObject[];
}

function CombatLog({ messages }: CombatLogProps) {
  return (
    <section role="log" className="combatLog">
      <h3 className="combatLog__title">Registro de combate</h3>
      {messages.length ? (
        <ul>
          {messages.map((message, index) => (
            <li
              key={index}
              className={`combatLog__msg combatLog__msg--${message.type}`}
            >
              {message.text}
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
