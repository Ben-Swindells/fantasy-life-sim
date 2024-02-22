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
  return <>{children}</>;
};
