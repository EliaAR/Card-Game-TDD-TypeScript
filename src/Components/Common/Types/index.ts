export type CharacterObject = {
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

export type ConsumableObject = {
  name: string;
  srcImg: string;
  number: number;
};
