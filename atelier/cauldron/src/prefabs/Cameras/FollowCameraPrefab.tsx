import {
  FollowCamera,
  FollowCameraProps,
} from "@atelier/elements/scripts/Cameras/FollowCamera";
import { Box, Capsule, Plane } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Character } from "@atelier/elements/scripts/Character/";
import { RigidBody } from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import { findCharacterById } from "@toolbelt/redux/slices/cauldron/prefabs/Characters";
import { useSelector } from "react-redux";
import { v4 as uuid4 } from "uuid";

findCharacterById;
export const FollowCameraScene = () => {
  const playerRef = useRef<THREE.Mesh>();
  const [characterId, setCharacterId] = useState<string>(uuid4());
  const char = useSelector(
    (state) => state.cauldron.prefabs.characters.characterList[characterId]
  );
  console.log(char);

  return (
    <>
      <ambientLight />
      <Character
        id={characterId}
        debugMode={false}
        isPlayer={true}
        getId={(id) => setCharacterId(id)}
      >
        <Capsule ref={playerRef} position={[0, 1.5, 0]}>
          <meshStandardMaterial color="red" />
        </Capsule>
      </Character>
      <RigidBody
        colliders="cuboid"
        enabledTranslations={[false, false, false]}
        enabledRotations={[false, false, false]}
      >
        <Box scale={[10, 0.2, 10]} />
      </RigidBody>
      {char && (
        <FollowCameraPrefab target={char.transform.position} distance={20} />
      )}
      <axesHelper args={[1]} />
      <gridHelper args={[10, 10]} />
    </>
  );
};

export const FollowCameraPrefab = ({ target, distance }: FollowCameraProps) => {
  return (
    <>
      <FollowCamera target={target} distance={distance} />
    </>
  );
};
