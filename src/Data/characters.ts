import { Character } from "../Components/Common/Types";
import Aleksandra from "../Images/Aleksandra.png";
import Gnome from "../Images/Gnome.png";
import Human from "../Images/Human.png";
import Dwarf from "../Images/Dwarf.png";
import Elf from "../Images/Elf.png";

const enemy: Character[] = [
  {
    name: "Francesco",
    srcImg: Gnome,
    life: 20,
    strength: 15,
    dexterity: 14,
  },
  {
    name: "Sam",
    srcImg: Human,
    life: 32,
    strength: 12,
    dexterity: 14,
  },
  {
    name: "Agusto",
    srcImg: Dwarf,
    life: 42,
    strength: 15,
    dexterity: 15,
  },
  {
    name: "Christoff",
    srcImg: Elf,
    life: 57,
    strength: 17,
    dexterity: 16,
  },
];

const player: Character[] = [
  {
    name: "Aleksándra",
    srcImg: Aleksandra,
    life: 14,
    strength: 18,
    dexterity: 14,
  },
  {
    name: "Aleksándra",
    srcImg: Aleksandra,
    life: 23,
    strength: 18,
    dexterity: 14,
  },
  {
    name: "Aleksándra",
    srcImg: Aleksandra,
    life: 32,
    strength: 18,
    dexterity: 14,
  },
  {
    name: "Aleksándra",
    srcImg: Aleksandra,
    life: 45,
    strength: 18,
    dexterity: 14,
  },
];

export { player, enemy };
