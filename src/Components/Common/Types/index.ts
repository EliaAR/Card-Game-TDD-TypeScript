export type Character = {
  name: string;
  srcImg: string;
  life: number;
  strength: number;
  dexterity: number;
};

export type MessageObject = {
  text: string;
  type: "playerTurn" | "enemyTurn" | "attack";
};

export type Consumables = {
  name: string;
  srcImg: string;
  number: number;
};
