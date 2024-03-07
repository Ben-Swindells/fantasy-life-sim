import { CharacterControls } from "./CharacterControls";
import { CharacterMovement } from "./CharacterMovement";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCharacter } from "@toolbelt/redux/slices/cauldron/prefabs/Characters";
import { v4 as uuid4 } from "uuid";
import * as THREE from "three";

type CharacterProps = {
  isPlayer: boolean;
  debugMode: boolean;
  children: React.ReactNode;
};

export const Character = ({
  children,
  isPlayer,
  debugMode,
}: CharacterProps) => {
  const [position, setPosition] = useState([0, 0, 0]);
  const dispatch = useDispatch();
  const id = uuid4();
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
  return (
    <>
      <axesHelper position={[0, 2, 0]} args={[5]} visible={debugMode} />
      <CharacterControls enabled={isPlayer}>
        <CharacterMovement
          id={id}
          speed={5}
          withControls={isPlayer}
          getCurrentPosition={() => {
            setPosition(position);
          }}
        >
          {children}
        </CharacterMovement>
      </CharacterControls>
    </>
  );
};
