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
  const [smoothedCameraPosition] = useState(() => new THREE.Vector3());
  const [smoothedCameraTarget] = useState(() => new THREE.Vector3());

  useFrame(() => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(target);
      cameraPosition.z += distance;
      cameraPosition.y += distance / 2;

      const cameraTarget = new THREE.Vector3();
      cameraTarget.copy(target);
      cameraTarget.y += 0.25;

      smoothedCameraPosition.lerp(cameraPosition, 0.1);
      smoothedCameraTarget.lerp(cameraTarget, 0.1);

      camera.position.copy(smoothedCameraPosition);
      camera.lookAt(smoothedCameraTarget);
    }
  });

  if (target !== null) {
    return (
      <>
        <PerspectiveCamera makeDefault ref={cameraRef} />
        <OrbitControls
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
