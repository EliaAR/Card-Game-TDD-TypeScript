import { ConsumableObject } from "../Common/Types";
import "./Consumable.scss";

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
      className="consumable"
    >
      <img src={srcImg} alt={`Imagen ${name}`} className="consumable__img" />
      <p className="consumable__number">x{number}</p>
    </section>
  );
}

export { Consumable };
