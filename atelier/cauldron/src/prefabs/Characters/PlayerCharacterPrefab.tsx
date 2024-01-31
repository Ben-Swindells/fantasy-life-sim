import { Capsule } from "@react-three/drei";
import { PlayerCharacter } from "@atelier/elements/3d/components/Characters";

type PlayerCharacterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const PlayerCharacterPrefab = () => {
  return (
    <group>
      <PlayerCharacter />
    </group>
  );
};
