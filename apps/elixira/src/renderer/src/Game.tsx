import { Suspense } from 'react'
import { SandboxScene } from './components/scenes'
import { GameGUI } from './engine/ui'
import { GameWindow } from './engine/window'
import { Physics } from '@react-three/rapier'

function Game(): JSX.Element {
  return (
    <>
      <GameGUI />
      <GameWindow>
        <Suspense>
          <Physics debug={false}>
            <SandboxScene />
          </Physics>
        </Suspense>
      </GameWindow>
    </>
  )
}

export default Game
