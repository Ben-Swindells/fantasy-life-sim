import { RigidBody } from "@react-three/rapier";

type AIMovementProps = {
  moveToPoints: THREE.Vector3[];
  children: React.ReactNode;
};

export const AIMovement = ({ moveToPoints, children }: AIMovementProps) => {
  return (
    <RigidBody>
      <group>{children}</group>
    </RigidBody>
  );
};
