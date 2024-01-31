import { SandboxScene } from './components/scenes'
import { GameGUI } from './engine/ui'
import { GameWindow } from './engine/window'

function Game(): JSX.Element {
  return (
    <>
      <GameGUI />
      <GameWindow>
        <SandboxScene />
      </GameWindow>
    </>
  )
}

export default Game
