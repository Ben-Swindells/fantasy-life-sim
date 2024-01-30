import { Capsule } from "@react-three/drei";

type PlayerCharacterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const PlayerCharacterPrefab = () => {
  return (
    <group>
      <Capsule />
    </group>
  );
};
