import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
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

    state.camera.lookAt(target);
    state.camera.updateProjectionMatrix();
  });

  if (target !== null) {
    return (
      <OrbitControls
        makeDefault
        position={[currPosition.x, currPosition.y, distance]}
      />
    );
  }
};
