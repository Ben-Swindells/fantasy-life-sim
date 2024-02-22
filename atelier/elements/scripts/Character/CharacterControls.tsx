import { useMemo } from "react";
import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";

enum CharacterControlsList {
  forward = "forward",
  back = "back",
  left = "left",
  right = "right",
}

export const CharacterControls = ({ children }: { children: JSX.Element }) => {
  const map = useMemo<KeyboardControlsEntry<CharacterControlsList>[]>(
    () => [
      { name: CharacterControlsList.forward, keys: ["ArrowUp", "KeyW"] },
      { name: CharacterControlsList.back, keys: ["ArrowDown", "KeyS"] },
      { name: CharacterControlsList.left, keys: ["ArrowLeft", "KeyA"] },
      { name: CharacterControlsList.right, keys: ["ArrowRight", "KeyD"] },
    ],
    []
  );
  return <KeyboardControls map={map}>{children}</KeyboardControls>;
};
