import { Ground } from "@atelier/elements/scripts/Enviroment/Objects/Ground";
import { Box, Capsule } from "@react-three/drei";
import { PlayerCharacterPrefab } from "./PlayerCharacterPrefab";
import {
  AICharacterMovementProps,
  Character,
  CharacterSettingsProps,
} from "@atelier/elements/scripts/Character";
import { v4 as uuid4 } from "uuid";
import { useState } from "react";

export const EnemyCharacterScene = () => {
  return (
    <>
      <Ground>
        <Box scale={[10, 1, 10]} />
      </Ground>
      <PlayerCharacterPrefab
        debugMode={false}
        isPlayer={true}
        movement={{
          cameraDistance: 20,
          jumpStrength: 5,
          speed: 1,
        }}
      >
        <Capsule position={[0, 2, 0]}>
          <meshBasicMaterial color={"blue"} />
        </Capsule>
      </PlayerCharacterPrefab>
      <EnemyCharacterPrefab>
        <Capsule position={[0, 2, 0]}>
          <meshBasicMaterial color={"red"} />
        </Capsule>
      </EnemyCharacterPrefab>
    </>
  );
};

type EnemyCharacterPrefabProps = {
  debugMode?: boolean;
  children?: React.ReactNode;
  movement?: AICharacterMovementProps;
  settings?: CharacterSettingsProps;
};

export const EnemyCharacterPrefab = ({
  debugMode = false,
  movement = {
    speed: 1,
    jumpStrength: 1,
  },
  settings = {
    height: 2,
  },
  children,
}: EnemyCharacterPrefabProps) => {
  const [characterId, setCharacterId] = useState<string>(uuid4());
  return (
    <Character
      id={characterId}
      debugMode={debugMode}
      isPlayer={false}
      getId={(id) => setCharacterId(id)}
      ai={{
        movement: movement,
      }}
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
