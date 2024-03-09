import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

export enum CharacterControlsList {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
  jump = "jump",
}

type CharacterControlsProps = {
  enabled: boolean;
  children: React.ReactNode;
};

export const CharacterControls = ({
  children,
  enabled,
}: CharacterControlsProps) => {
  const map = useMemo<KeyboardControlsEntry<CharacterControlsList>[]>(
    () => [
      { name: CharacterControlsList.forward, keys: ["ArrowUp", "KeyW"] },
      { name: CharacterControlsList.back, keys: ["ArrowDown", "KeyS"] },
      { name: CharacterControlsList.left, keys: ["ArrowLeft", "KeyA"] },
      { name: CharacterControlsList.right, keys: ["ArrowRight", "KeyD"] },
      { name: CharacterControlsList.jump, keys: ["Space"] },
    ],
    []
  );
  if (enabled) {
    return <KeyboardControls map={map}>{children}</KeyboardControls>;
  }
};
