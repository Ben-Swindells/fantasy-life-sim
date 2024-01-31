import { Canvas } from '@react-three/fiber'

//The main game window that outputs 3D graphics
export const GameWindow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full">
      <Canvas>{children}</Canvas>
    </div>
  )
}
