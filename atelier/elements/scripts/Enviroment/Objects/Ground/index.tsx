import { RigidBody } from "@react-three/rapier";

export const Ground = ({ children }: { children: React.ReactNode }) => {
  return (
    <RigidBody
      name="ground"
      colliders="cuboid"
      enabledTranslations={[false, false, false]}
      enabledRotations={[false, false, false]}
    >
      {children}
    </RigidBody>
  );
};
