import { PlayerCharacter } from "@atelier/elements/3d/components/Characters";

type PlayerCharacterProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
};

export const PlayerCharacterScene = () => {
  return <PlayerCharacterPrefab />;
};

export const PlayerCharacterPrefab = () => {
  return (
    <group>
      <PlayerCharacter />
    </group>
  );
};
