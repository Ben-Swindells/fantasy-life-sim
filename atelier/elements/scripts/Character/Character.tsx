import { CharacterControls } from "./CharacterControls";
import { CharacterMovement } from "./CharacterMovement";

type CharacterProps = {
  isPlayer: boolean;
  children: React.ReactNode;
};

export const Character = ({ children, isPlayer }: CharacterProps) => {
  return (
    <CharacterControls enabled={isPlayer}>
      <CharacterMovement speed={5} withControls={isPlayer}>
        {children}
      </CharacterMovement>
    </CharacterControls>
  );
};
