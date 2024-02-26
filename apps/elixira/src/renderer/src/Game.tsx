import { SandboxScene } from './components/scenes'
import { GameGUI } from './engine/ui'
import { GameWindow } from './engine/window'
import { Physics } from '@react-three/rapier'

function Game(): JSX.Element {
  return (
    <>
      <GameGUI />
      <GameWindow>
        <Physics debug={false}>
          <SandboxScene />
        </Physics>
      </GameWindow>
    </>
  )
}

export default Game
