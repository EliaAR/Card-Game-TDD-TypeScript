export type Character = {
  name: string;
  srcImg: string;
  life: number;
  strength: number;
  dexterity: number;
  level: number;
};

export type MessageObject = {
  text: string;
  type: "playerTurn" | "enemyTurn" | "attack";
};
