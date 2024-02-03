import { PotionBottleScene } from "./prefabs/Potion";
import { PlayerCharacterScene } from "./prefabs/Characters";

export const prefabPages = [
  {
    buttonLabel: "Potion bottle",
    path: "/potion-bottle",
    scene: PotionBottleScene(),
  },
  {
    buttonLabel: "Player Character",
    path: "/player-character",
    scene: PlayerCharacterScene(),
  },
];
