import { PotionBottleScene } from "./prefabs/Potion";
import { PlayerCharacterScene } from "./prefabs/Characters";
import { FollowCameraScene } from "./prefabs/Cameras/FollowCameraPrefab";

export const prefabPages = [
  {
    buttonLabel: "Potion bottle",
    path: "/potion-bottle",
    scene: <PotionBottleScene />,
  },
  {
    buttonLabel: "Player Character",
    path: "/player-character",
    scene: <PlayerCharacterScene />,
  },
  {
    buttonLabel: "Follow Camera",
    path: "/cameras/follow-camera",
    scene: <FollowCameraScene />,
  },
];
