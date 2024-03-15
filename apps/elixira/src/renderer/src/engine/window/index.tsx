import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'

//The main game window that outputs 3D graphics
export const GameWindow = ({ children }: { children: React.ReactNode }) => {
  return (
    <div id="game-window" className="h-full w-full">
      <Canvas>
        <Physics>{children}</Physics>
      </Canvas>
    </div>
  )
}
