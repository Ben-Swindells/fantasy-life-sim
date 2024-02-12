import {
  FollowCamera,
  FollowCameraProps,
} from "@atelier/elements/scripts/Cameras/FollowCamera";
import { Box } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

export const FollowCameraScene = () => {
  const boxRef = useRef<THREE.Mesh>();
  const [target, setTarget] = useState<THREE.Vector3 | null>(null);
  useEffect(() => {
    if (boxRef.current) {
      setTarget(boxRef.current.position);
    }
  }, [boxRef]);
  return (
    <>
      <Box ref={boxRef} />
      <FollowCameraPrefab target={target} distance={10} />
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
