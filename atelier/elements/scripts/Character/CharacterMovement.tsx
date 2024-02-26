import { useKeyboardControls } from "@react-three/drei";
import { CharacterControls, CharacterControlsList } from "./CharacterControls";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  TrimeshCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";

type CharacterMovementProps = {
  speed: number;
  children: React.ReactNode;
  withControls: boolean;
};

export const CharacterMovement = ({
  children,
  withControls,
  speed,
}: CharacterMovementProps) => {
  const characterRigidBody = useRef<RapierRigidBody>(null);
  const [sub, get] = useKeyboardControls<CharacterControlsList>();

  useEffect(() => {
    if (!withControls) return;
    if (!characterRigidBody.current) return;
    return sub(
      (state) => state.forward,
      (pressed) => {
        characterRigidBody.current?.addTorque({ x: 0, y: 0, z: speed }, true);
      }
    );
  });

  useFrame(() => {
    // Fetch fresh data from store
    const pressed = get().back;
  });

  return (
    <RigidBody
      ref={characterRigidBody}
      colliders="trimesh"
      enabledRotations={[false, false, true]}
    >
      <group>{children}</group>
    </RigidBody>
  );
};
