import { useEffect, useRef } from "react";
import { MessageObject } from "../Common/Types";
import "./CombatLog.scss";

interface CombatLogProps {
  messages: MessageObject[];
}

function CombatLog({ messages }: CombatLogProps) {
  const lastMsgRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    lastMsgRef.current?.scrollIntoView();
    console.log(lastMsgRef.current);
  });

  return (
    <section role="log" className="combatLog">
      <h3 className="combatLog__title">Registro de combate</h3>
      {messages.length ? (
        <ul>
          {messages.map((message, index, array) => (
            <li
              key={index}
              className={`combatLog__msg combatLog__msg--${message.type}`}
              ref={array.length - 1 === index ? lastMsgRef : undefined}
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
