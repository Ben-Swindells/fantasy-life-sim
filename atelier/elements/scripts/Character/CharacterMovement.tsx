import { useKeyboardControls } from "@react-three/drei";
import { CharacterControls, CharacterControlsList } from "./CharacterControls";
import { useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { TrimeshCollider, RigidBody } from "@react-three/rapier";

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
  const [sub, get] = useKeyboardControls<CharacterControlsList>();

  useEffect(() => {
    if (!withControls) return;
    return sub(
      (state) => state.forward,
      (pressed) => {
        console.log("forward", pressed);
      }
    );
  });

  useFrame(() => {
    // Fetch fresh data from store
    const pressed = get().back;
  });

  return (
    <RigidBody colliders="trimesh">
      <group>{children}</group>
    </RigidBody>
  );
};
