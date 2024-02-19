import { KeyboardControls, KeyboardControlsEntry } from "@react-three/drei";
import { ReactElement, ReactNode, useMemo } from "react";

enum ControlsList {
  RightClick = "rightclick",
}

export const Controls = ({ children }: { children: JSX.Element }) => {
  const map = useMemo<KeyboardControlsEntry<ControlsList>[]>(
    () => [{ name: ControlsList.RightClick, keys: ["rightclick"] }],
    []
  );
  return <KeyboardControls map={map}>{children}</KeyboardControls>;
};
