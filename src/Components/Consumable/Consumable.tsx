import { ConsumableObject } from "../Common/Types";

interface ConsumableProps extends ConsumableObject {
  onClickConsumable: React.MouseEventHandler<HTMLElement>;
}

function Consumable({
  onClickConsumable,
  name,
  srcImg,
  number,
}: ConsumableProps) {
  return (
    <section role="button" aria-label={name} onClick={onClickConsumable}>
      <p>{name}</p>
      <img src={srcImg} alt={`Imagen ${name}`} />
      <p>Nº{number}</p>
    </section>
  );
}

export { Consumable };
