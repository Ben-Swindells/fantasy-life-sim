import {
  Character,
  CharacterMovementProps,
  CharacterSettingsProps,
} from "@atelier/elements/scripts/Character";
import { Capsule, Box } from "@react-three/drei";
import { v4 as uuid4 } from "uuid";
import { Ground } from "@atelier/elements/scripts/Enviroment/Objects/Ground";
import { useRef, useState } from "react";

type PlayerCharacterPrefabProps = {
  debugMode?: boolean;
  movement?: CharacterMovementProps;
  settings?: CharacterSettingsProps;
  isPlayer?: boolean;
  children?: React.ReactNode;
};

export const PlayerCharacterScene = () => {
  return (
    <>
      <ambientLight />
      <PlayerCharacterPrefab
        debugMode={true}
        isPlayer={true}
        movement={{
          cameraDistance: 20,
          jumpStrength: 5,
          speed: 2,
        }}
      />
      <Ground>
        <Box scale={[10, 0.2, 10]} />
      </Ground>

      <axesHelper args={[1]} position={[0, 2, 0]} />
      <gridHelper args={[10, 10]} />
    </>
  );
};

export const PlayerCharacterPrefab = ({
  debugMode = false,
  isPlayer = false,
  settings = {
    height: 2,
  },
  movement = {
    cameraDistance: 10,
    speed: 1,
    jumpStrength: 1,
  },
  children,
}: PlayerCharacterPrefabProps) => {
  const [characterId, setCharacterId] = useState<string>(uuid4());
  return (
    <Character
      id={characterId}
      debugMode={debugMode}
      isPlayer={isPlayer}
      getId={(id) => setCharacterId(id)}
      movement={movement}
      settings={settings}
    >
      {children ? (
        children
      ) : (
        <Capsule position={[0, 1.5, 0]}>
          <meshStandardMaterial color="red" />
        </Capsule>
      )}
    </Character>
  );
};
