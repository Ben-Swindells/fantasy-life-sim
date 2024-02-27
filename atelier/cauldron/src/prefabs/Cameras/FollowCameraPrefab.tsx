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

export const FollowCameraScene = () => {
  const playerRef = useRef<THREE.Mesh>();
  const [target, setTarget] = useState<THREE.Vector3 | null>(null);

  return (
    <>
      <Character debugMode={true} isPlayer={true}>
        <Capsule ref={playerRef} position={[0, 1.5, 0]} />
      </Character>
      <RigidBody
        colliders="cuboid"
        enabledTranslations={[false, false, false]}
        enabledRotations={[false, false, false]}
      >
        <Box scale={[10, 0.2, 10]} />
      </RigidBody>
      <FollowCameraPrefab target={target} distance={10} />
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
