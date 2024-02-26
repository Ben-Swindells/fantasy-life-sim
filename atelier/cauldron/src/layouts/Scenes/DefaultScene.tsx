import { OrbitControls, Stage } from "@react-three/drei";

export const DefaultScene = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls minZoom={1} />
      <axesHelper args={[1]} />
      <gridHelper />
      <Stage intensity={0} shadows={false}>
        {children}
      </Stage>
    </>
  );
};
