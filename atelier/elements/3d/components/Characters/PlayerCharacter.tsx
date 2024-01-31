import { Capsule } from "@react-three/drei";

type PlayerCharacterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const PlayerCharacter = ({
  position,
  rotation,
  scale,
}: PlayerCharacterProps) => {
  return <Capsule position={position} rotation={rotation} scale={scale} />;
};
