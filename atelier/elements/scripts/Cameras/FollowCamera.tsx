import { PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export type FollowCameraProps = {
  target: THREE.Vector3;
  distance: number;
};

export const FollowCamera = ({ target, distance }: FollowCameraProps) => {
  const [currPosition, setCurrPosition] = useState(new THREE.Vector3(0, 0, 0));
  useFrame((state) => {
    setCurrPosition(state.camera.position);
    state.camera.position.lerp(
      new THREE.Vector3(currPosition.x, currPosition.y, distance),
      0.1
    );
    state.camera.lookAt(target);
  });
  if (target !== null) {
    return (
      <PerspectiveCamera
        makeDefault
        far={1000}
        near={0.1}
        position={[currPosition.x, currPosition.y, distance]}
      />
    );
  }
};
