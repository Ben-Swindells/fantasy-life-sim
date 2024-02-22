import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

enum CharacterControlsList {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
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
    ],
    []
  );
  if (enabled) {
    return <KeyboardControls map={map}>{children}</KeyboardControls>;
  }
};
