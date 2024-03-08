import { FollowCamera } from "@atelier/elements/scripts/Cameras/FollowCamera";
import { Character } from "@atelier/elements/scripts/Character";
import { Capsule } from "@react-three/drei";

type PlayerCharacterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const PlayerCharacterScene = () => {
  return (
    <>
      <PlayerCharacterPrefab />
    </>
  );
};

export const PlayerCharacterPrefab = () => {
  return (
    <group>
      <Character isPlayer={true} debugMode={true}>
        <Capsule />
      </Character>
    </group>
  );
};
