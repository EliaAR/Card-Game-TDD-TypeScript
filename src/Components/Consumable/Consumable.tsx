import { ConsumableObject } from "../Common/Types";

interface ConsumableProps extends ConsumableObject {
  onClickConsumable: React.MouseEventHandler<HTMLElement>;
  consumableDisabled?: boolean;
}

function Consumable({
  onClickConsumable,
  name,
  srcImg,
  number,
  consumableDisabled,
}: ConsumableProps) {
  return (
    <section
      role="button"
      aria-label={name}
      onClick={!consumableDisabled ? onClickConsumable : undefined}
      aria-disabled={consumableDisabled}
    >
      <p>{name}</p>
      <img src={srcImg} alt={`Imagen ${name}`} />
      <p>Nº{number}</p>
    </section>
  );
}

export { Consumable };
