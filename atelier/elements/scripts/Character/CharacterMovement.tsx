import { useKeyboardControls } from "@react-three/drei";
import { CharacterControls, CharacterControlsList } from "./CharacterControls";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  TrimeshCollider,
  RapierRigidBody,
  RigidBody,
  vec3,
} from "@react-three/rapier";
import { useDispatch, useSelector } from "react-redux";
import { updatePosition } from "@toolbelt/redux/slices/cauldron/prefabs/Characters";

type CharacterMovementProps = {
  id: string;
  speed: number;
  children: React.ReactNode;
  withControls: boolean;
  getCurrentPosition: (position: THREE.Vector3) => void;
};

export const CharacterMovement = ({
  id,
  children,
  withControls,
  speed,
  getCurrentPosition,
}: CharacterMovementProps) => {
  const rig = useRef<RapierRigidBody>(null);
  const character = useRef<THREE.Group>(null);
  const [sub, get] = useKeyboardControls<CharacterControlsList>();
  const dispatch = useDispatch();

  useFrame((state, delta) => {
    if (!withControls) return;
    if (rig.current === null) return;
    // Fetch fresh data from store
    const { forward, back, left, right } = get();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = speed * delta * 10;
    const torqueStrength = speed * delta * 10;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (back) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }
    if (left) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }
    if (right) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }
    rig.current.applyImpulse(impulse, true);
    rig.current.applyTorqueImpulse(torque, true);
    dispatch(
      updatePosition({ id: id, position: vec3(rig.current.translation()) })
    );
  });

  return (
    <RigidBody ref={rig} colliders="trimesh" lockRotations>
      <group>{children}</group>
    </RigidBody>
  );
};
