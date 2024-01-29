import { PotionPrefab } from "./prefabs/Potion";
import { PlayerCharacterPrefab } from "./prefabs/Characters";

export const prefabPages = [
  {
    buttonLabel: "Potion bottle",
    path: "/potion-bottle",
    component: PotionPrefab(),
  },
  {
    buttonLabel: "Player Character",
    path: "/player-character",
    component: PlayerCharacterPrefab(),
  },
];
