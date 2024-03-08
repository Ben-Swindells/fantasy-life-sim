import {
  OrbitControls,
  OrbitControlsProps,
  PerspectiveCamera,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useState, useMemo, useRef } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

export type FollowCameraProps = {
  target: THREE.Vector3;
  distance: number;
};

enum FollowCameraControlsList {
  RightClick = "rightclick",
}

export const FollowCamera = ({ target, distance }: FollowCameraProps) => {
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControlsProps | null>(null);

  useFrame(() => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const controls = controlsRef.current;

      camera.lookAt(target);
      controls.target = target;
    }
  });

  if (target !== null) {
    return (
      <>
        <PerspectiveCamera
          makeDefault
          ref={cameraRef}
          position={[target.x, target.y, distance]}
        />
        <OrbitControls
          makeDefault
          ref={controlsRef}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={-Math.PI / 4}
          mouseButtons={{ RIGHT: THREE.MOUSE.ROTATE }}
        />
      </>
    );
  }
};

export const FollowCameraControls = ({
  children,
}: {
  children: JSX.Element;
}) => {
  const map = useMemo<KeyboardControlsEntry<FollowCameraControlsList>[]>(
    () => [{ name: FollowCameraControlsList.RightClick, keys: [""] }],
    []
  );
  return <KeyboardControls map={map}>{children}</KeyboardControls>;
};
