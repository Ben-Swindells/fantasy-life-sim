import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

type FollowCameraProps = {
  target: THREE.Vector3;
};

export const FollowCamera = ({ target }: FollowCameraProps) => {
  return <OrbitControls target0={target} />;
};
