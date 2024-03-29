import { CharacterControls } from "./CharacterControls";
import { CharacterMovement } from "./CharacterMovement";
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

type CharacterProps = {
  id: string;
  isPlayer: boolean;
  debugMode: boolean;
  children: React.ReactNode;
  getId?: (id: string) => void;
  movement?: CharacterMovementProps;
};

export const Character = ({
  id,
  children,
  isPlayer,
  debugMode,
  getId,
  movement,
}: CharacterProps) => {
  const [position, setPosition] = useState([0, 0, 0]);
  const dispatch = useDispatch();
  const characters = useSelector(
    (state) => state.cauldron.prefabs.characters.characterList
  );
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

  return (
    <>
      <CharacterControls enabled={isPlayer}>
        {isPlayer && movement && (
          <CharacterMovement
            id={id}
            cameraDistance={movement.cameraDistance}
            speed={movement.speed}
            jumpStrength={movement.jumpStrength}
          >
            <axesHelper position={[0, 2, 0]} args={[5]} visible={debugMode} />
            {children}
          </CharacterMovement>
        )}
      </CharacterControls>
    </>
  );
};
