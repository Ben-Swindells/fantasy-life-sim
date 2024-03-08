import { FollowCamera } from "@atelier/elements/scripts/Cameras/FollowCamera";
import { Character } from "@atelier/elements/scripts/Character";
import { Capsule } from "@react-three/drei";
import { v4 as uuid4 } from "uuid";
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
      {/* <Character id={uuid4()} isPlayer={true} debugMode={true}>
        <Capsule />
      </Character> */}
    </group>
  );
};
