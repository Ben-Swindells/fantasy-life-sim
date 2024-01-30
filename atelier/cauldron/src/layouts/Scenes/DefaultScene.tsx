import { OrbitControls } from "@react-three/drei";

export const DefaultScene = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls minZoom={1} maxPolarAngle={Math.PI / 2} />
      {children}
    </>
  );
};
