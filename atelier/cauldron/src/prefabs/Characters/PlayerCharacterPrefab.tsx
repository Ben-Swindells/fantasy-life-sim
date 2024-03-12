import { Character } from "@atelier/elements/scripts/Character";
import { Capsule, Box } from "@react-three/drei";
import { v4 as uuid4 } from "uuid";
import { Ground } from "@atelier/elements/scripts/Enviroment/Objects/Ground";
import { useRef, useState } from "react";

type PlayerCharacterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const PlayerCharacterScene = () => {
  return (
    <>
      <ambientLight />
      <PlayerCharacterPrefab />
      <Ground>
        <Box scale={[10, 0.2, 10]} />
      </Ground>

      <axesHelper args={[1]} />
      <gridHelper args={[10, 10]} />
    </>
  );
};

export const PlayerCharacterPrefab = () => {
  const playerRef = useRef<THREE.Mesh>();
  const [characterId, setCharacterId] = useState<string>(uuid4());
  return (
    <Character
      id={characterId}
      debugMode={true}
      isPlayer={true}
      getId={(id) => setCharacterId(id)}
      movement={{ cameraDistance: 10, speed: 2 }}
    >
      <Capsule ref={playerRef} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="red" />
      </Capsule>
    </Character>
  );
};
