import { OrbitControls, Stage } from "@react-three/drei";

export const DefaultScene = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls minZoom={1} />
      <Stage intensity={0} shadows={false}>
        {children}
      </Stage>
    </>
  );
};
