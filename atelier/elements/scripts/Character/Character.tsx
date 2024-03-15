import { CharacterControls } from "./CharacterControls";
import { PlayerMovement } from "./PlayerMovement";
import { AIMovement } from "./AIMovement";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCharacter } from "@toolbelt/redux/slices/cauldron/prefabs/Characters";
import { v4 as uuid4 } from "uuid";
import * as THREE from "three";

export type CharacterMovementProps = {
  cameraDistance: number;
  speed: number;
  jumpStrength: number;
};

export type CharacterSettingsProps = {
  height: number;
};

export type AICharacterMovementProps = {
  speed: number;
  jumpStrength: number;
  moveToPoints?: THREE.Vector3[];
};

export type CharacterAIProps = {
  movement: AICharacterMovementProps;
};

type CharacterProps = {
  id: string;
  isPlayer: boolean;
  debugMode: boolean;
  children: React.ReactNode;
  getId?: (id: string) => void;
  movement?: CharacterMovementProps;
  settings: CharacterSettingsProps;
  ai?: CharacterAIProps;
};

export const Character = ({
  id,
  children,
  isPlayer,
  debugMode,
  getId,
  movement,
  settings,
  ai,
}: CharacterProps) => {
  const [position, setPosition] = useState([0, 0, 0]);
  const dispatch = useDispatch();
  const characters = useSelector(
    (state) => state.cauldron.prefabs.characters.characterList
  );
  useEffect(() => {
    if (!characters[id]) {
      dispatch(
        addCharacter({
          id,
          transform: {
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1),
          },
        })
      );
    }

    if (getId) getId(id);
  }, []);
  return (
    <>
      <CharacterControls enabled={isPlayer}>
        {isPlayer && movement && (
          <PlayerMovement
            id={id}
            cameraDistance={movement.cameraDistance}
            speed={movement.speed}
            jumpStrength={movement.jumpStrength}
            height={settings.height}
          >
            <axesHelper position={[0, 2, 0]} args={[5]} visible={debugMode} />
            {children}
          </PlayerMovement>
        )}
        {!isPlayer && ai?.movement && (
          <AIMovement moveToPoints={ai.movement.moveToPoints}>
            {children}
          </AIMovement>
        )}
      </CharacterControls>
    </>
  );
};
