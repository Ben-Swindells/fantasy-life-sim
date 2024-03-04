import { CharacterControls } from "./CharacterControls";
import { CharacterMovement } from "./CharacterMovement";
import { useId } from "react";
type CharacterProps = {
  isPlayer: boolean;
  debugMode: boolean;
  children: React.ReactNode;
};

export const Character = ({
  children,
  isPlayer,
  debugMode,
}: CharacterProps) => {
  return (
    <>
      <axesHelper position={[0, 2, 0]} args={[5]} visible={debugMode} />
      <CharacterControls enabled={isPlayer}>
        <CharacterMovement speed={5} withControls={isPlayer}>
          {children}
        </CharacterMovement>
      </CharacterControls>
    </>
  );
};
